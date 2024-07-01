module panther::lending_vault{

    //==============================================================================================
    // Dependencies
    //==============================================================================================
    use aptos_framework::event::{EventHandle, emit, emit_event};
    use std::signer;
    use aptos_framework::account;
    use std::string::{Self, String};
    use std::error;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::coin::{Self, BurnCapability, FreezeCapability, MintCapability};
    use aptos_framework::managed_coin;
    use aptos_std::type_info;
    use aptos_framework::guid;  
    use aptos_std::simple_map::{Self,SimpleMap};
    // use aptos_framework::event::{EventHandle, emit, emit_event};
    // use aptos_framework::create_signer::create_signer;

    //==============================================================================================
    // Errors: Define errors always starts with E then Name of the error
    //==============================================================================================

    const EALREADY_VAULT: u64 = 1;
    const ENOT_ADMIN: u64 = 2;
    const ENOT_WHITELISTED: u64 = 3;
    const EINSUFFICIENT_BALANCE: u64 = 4;
    const INTEREST_RATE: u64 = 10;
    const EINVALID_ID: u64 = 5;
    const EINSUFFICIENT_PREFILLED: u64 = 6;
    const EALREADY_HAS_BALANCE: u64 = 7;
    const EEQUAL_ADDR: u64 = 8;
    const NFT_WORTH:u64 = 10;
    const ENO_CAPABILITIES: u64 = 9;
    const EALREADY_COIN_CAP: u64 = 11;
    const EINVALID_AMOUNT: u64 = 12;
    const EMORE_THAN_CAPACITY: u64 = 13;
    const EJUNIOR_TRANCHE_LOCKED: u64 = 14;
    const EJUNIOR_TRANCHE_FULL: u64 = 15;
    const ESENIOR_TRANCHE_LOCKED: u64 = 16;
    const EINVALID_PERIOD_PAYMENT: u64 = 17;
    const EMORE_THAN_TOTAL_CAPACITY: u64 = 18;
    const EREACHED_BORROW_LIMIT: u64 = 19;
    const ENOT_DEPOSITED: u64 = 20;
    const EJUNIOR_TRANCHE_NOT_LOCKED: u64 = 21;
    const ESENIOR_TRANCHE_NOT_LOCKED: u64 = 22; 
    const ESENIOR_TRANCHE_NOT_ACTIVATED: u64 = 23;
    //==============================================================================================
    // Constants
    //==============================================================================================

    const JUNIOR_TRANCHE_PERCENT: u64 = 18; // 20% for Junior Tranche
    const SENIOR_TRANCHE_PERCENT: u64 = 8; 
    //const TOTAL_CAPACITY: u64 = 1000000; // Example total capacity
    //const JUNIOR_CAPACITY: u64 = 200000; 
    //const TOTAL_PERIODS: u64 = 12; // 12 months
    const MONTH_IN_SECONDS: u64 = 2592000; // 1 month in seconds
    const BASE_APTOS_PRICE:u64=100000000;
    //const SALT: vector<u8> = vector::from_hex("0x1234");

    #[event]
    struct DepositEvent has drop, store {
        user: address,
        pool_address: address,
        amount: u64,
        timestamp: u64,
        tranche: String // Junior or Senior
    }

    #[event]
    struct RedeemEvent has drop, store {
        user: address,
        pool_address: address,
        amount: u64,
        timestamp: u64,
        tranche: String // Junior or Senior
    }
    //==============================================================================================
    // Module Structs
    //==============================================================================================

    struct Capabilities has key {
        burn_cap: BurnCapability<AptosXCoin>,
        freeze_cap: FreezeCapability<AptosXCoin>,
        mint_cap: MintCapability<AptosXCoin>,
    }
    struct AptosXCoin {}

    struct SeniorCapabilities has key {
        burn_cap: BurnCapability<SeniorXCoin>,
        freeze_cap: FreezeCapability<SeniorXCoin>,
        mint_cap: MintCapability<SeniorXCoin>,
    }
    struct SeniorXCoin {}

    struct BorrowPool has store{
        pool_name: String,
        current_amount_available: u64,
        pool_address: address,
        total_amount_per_period:u64,
        interest_per_period:u64,
        ratePerSecond:u64,
        total:u64,
        prinicipalAmount:u64,
        interestAmount:u64,
        totalRepayedAmount:u64,
        totalPrincipalRepayed:u64,
        totalInterestRepayed:u64,
        totalPeriod:u64,
        loanTerm:u64,
        currentPeriod:u64,
        lateFeeInterestRate:u64,
        gracePeriod:u64,
        totalInterestForLoanTerm:u64,
        loan_start_time:u64, //Timestamp
        loan_next_payment_time:u64, //Timestamp
        loanEnded:bool,
        isBulletRepay:bool
    }

    struct BorrowPools has key, store{
        pools: vector<BorrowPool>,
    }

    // Resources
    struct UserPool has store, drop{
        pool_address: address,
        total_deposit: u64,
        timestamp: u64, 
        pool_name: String,
        interest_rate: u64,
        term: String,
        maturity: String,
    }

    struct UserPools has key, store{
        pools: vector<UserPool>,
    }
    struct Whitelist has key, store, drop {
        whitelist: vector<address>,
    }
    //create a resource for investor to store user deposit of junior and senior and redeem of junior and senior transaction details
    struct UserEvent has key, store{
        timestamp: u64,
        pool_address: address,
        amount: u64,
        user_address: address,
        event_type: String, //deposit or redeem
        tranche: String, //junior or senior
    }
    // vector to store the user events for user address
    struct UserEvents has key, store{
        events: vector<UserEvent>,
    }

    //create a resource for the borrower to store the pool details of the borrower
    struct BorrowerEvent has key, store{
        timestamp: u64,
        pool_address: address,
        amount: u64,
        user_address: address,
        event_type: String, //borrowed or repayed
        tranche: String, //junior or senior
    }

    // vector to store the borrower events for user address
    struct BorrowerEvents has key, store{
        events: vector<BorrowerEvent>,
    }

    struct AdminEvent has key, store{
        timestamp: u64,
        pool_name: String,
        principal: u64,
        financing_fee: u64,
        deal_formation_period: u64,
        deal_grace_period: u64,
        user_address: address,
    }
    // vector to store the admin events for user address
    struct AdminEvents has key, store{
        events: vector<AdminEvent>,
    }
    //==============================================================================================
    // Investor Portfolio
    //==============================================================================================

    struct InvestHistory has key,store{
        amount: u64,
        timestamp: u64,
    }
    struct PoolDistribution has key,store{
        pool_address: address,
        amount_invested: u64,
    }
    struct InterestDistribution has key,store{
        pool_address: address,
        interest_earned: u64,
    }
    struct PortfolioDistribution has key,store{
        no_of_pools: u64,
        allocation_amount: u64,
        pool_distribution: vector<PoolDistribution>,
        interest_distribution: vector<InterestDistribution>,
    }
    struct InvestorPortfolio has key,store{
        total_portfolio_value: u64,
        total_interest_earned: u64,
        weighted_apy: u64,
        invest_history: vector<InvestHistory>,
        portfolio_distribution: PortfolioDistribution,
    }

     //==============================================================================================
    // Borrower Portfolio
    //==============================================================================================
    struct BorrowHistory has key,store{
        amount: u64,
        timestamp: u64,
    }
    struct BorrowPoolDistribution has key,store{
        pool_address: address,
        pool_name: String,
        amount_borrowed: u64,
    }
    struct RepayedHistory has key,store{
        amount: u64,
        timestamp: u64,
    }
    struct BorrowerPortfolio has key,store{
        borrowed_amount: u64,
        repayed_amount: u64,
        total_available_amount: u64,
        outstanding_loan_amount: u64,
        average_interest_rate: u64,
        borrow_history: vector<BorrowHistory>,
        borrow_pool_distribution: vector<BorrowPoolDistribution>,
        repayed_history: vector<RepayedHistory>,
    }

    // Allocation
    struct InvestorAllocation has key,store{
        pool_address: address,
        interest_rate: u64,
        term: String,
        maturity: String,
        amount_invested: u64,
        principal_outstanding: u64,
    }

    // struct LiquidityPool has key, store {
    //     coin_type: address,
    //     fee: u64,
    // }

    // struct LiquidityPools has key, store {
    //     pools: vector<LiquidityPool>
    // }
    //this below datas are require for pool details 

    struct PoolDetails has key, store, copy{
        coin_type: address,
        deal_name: String,
        principal: u64,
        borrower_address: address,
        financing_fee: u64,
        deal_formation_period: u64,
        deal_grace_period: u64,
        repayment_period: u64,
        credit_rating: String,
        loan_type: String,
        tranches_structure: String,
        senior_ratio: u64,
        junior_ratio: u64,
        senior_apr: u64,
        junior_apr: u64,
        senior_ceiling: u64,
        junior_ceiling: u64,
        resource_addr: address,
        deployer_address: address,
        seeds: vector<u8>,
        uid: guid::ID,
        borrower_origination_fees:u64,
        lender_performance_fees:u64,
        isJuniorLocked:bool,
        isActivated:bool,
        isActivatedTimeStamp:u64,
        status: String,
    }

    struct LiquidityPools has key, store, copy {
        pools: vector<PoolDetails>
    }

    // struct LiquidityPoolMap has key {
    //     liquidity_pool_map: SimpleMap< vector<u8>,address>,
    // }

    struct LiquidityPoolCap has key{
        liquidity_pool_cap: account::SignerCapability,
    }

    // One stake vault for all user, used for recieve money
    struct StakeVault has key {
        resource_addr: address,
        signer_cap: account::SignerCapability
    }

    struct LPCoin has store, drop {
        value: u64,
        pool_address: address,
    }

    struct Tranches has key, store {
        junior: JuniorTranche,
        senior: SeniorTranche,
    }

    struct JuniorTranche has key, store, copy {
        current_amount: u64,
        interest_rate: u64,
        capacity: u64,
        isLocked: bool,
        isFull: bool,
        repayed_amount: u64,
        expected_return: u64,
        borrowed_amount: u64,
    }

    struct SeniorTranche has key, store, copy {
        current_amount: u64,
        interest_rate: u64,
        capacity: u64,
        isLocked: bool,
        isFull: bool,
        repayed_amount: u64,
        expected_return: u64,
        borrowed_amount: u64,
        isActivated: bool,
    }
    //store multiple tranches for multiple pools which have id as there pool address to identify the pool easily
    struct TrancheMap has key, store {
        pool_tranches: SimpleMap<address, Tranches>,
    }
    //==============================================================================================
    // Functions
    //==============================================================================================
    public fun activate(){
        
    }
    public fun coin_address<CoinType>(): address {
        let type_info = type_info::type_of<CoinType>();
        type_info::account_address(&type_info)
    }

    public entry fun initialize(
        account: &signer,
    ) {
        let account_addr = signer::address_of(account);
        assert!(!exists<Capabilities>(account_addr), error::already_exists(EALREADY_COIN_CAP));
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<AptosXCoin>(
            account,
            string::utf8(b"JuniorX Liquid Token"),
            string::utf8(b"JTQF"),
            8,
            true
        );
        move_to(account, Capabilities {
            burn_cap,
            freeze_cap,
            mint_cap,
        });
    }
    
    public entry fun initializeSenior(
        account: &signer,
    ) {
        let account_addr = signer::address_of(account);
        assert!(!exists<SeniorCapabilities>(account_addr), error::already_exists(EALREADY_COIN_CAP));
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<SeniorXCoin>(
            account,
            string::utf8(b"SeniorX Liquid Token"),
            string::utf8(b"STQF"),
            8,
            true
        );
        move_to(account, SeniorCapabilities {
            burn_cap,
            freeze_cap,
            mint_cap,
        });
    }
    // Entry functions
    //take all the details from the frontend of the pool details 
    public entry fun deploy_pool<CoinType>(account: &signer, financing_fee:u64, seeds: vector<u8>, funds:u64, deal_name: String, principal:u64, borrower_address: address, deal_formation_period:u64, deal_grace_period:u64, repayment_period:u64, credit_rating:String, loan_type: String, tranches_structure: String, senior_ratio: u64, junior_ratio: u64, senior_apr:u64, junior_apr:u64, senior_ceiling:u64, junior_ceiling:u64, borrow_pool_distribution:u64, lender_performance_fees:u64) acquires LiquidityPools, TrancheMap, AdminEvents{
        let account_addr = signer::address_of(account);
        // junior tranche resource account
        let (liquidity_pool, liquidity_pool_cap) = account::create_resource_account(account, seeds); //resource account
        //create another resource account to manage senior tranche
        let updateFunds=funds*BASE_APTOS_PRICE;
        coin::register<CoinType>(&liquidity_pool);
        coin::transfer<CoinType>(account, signer::address_of(&liquidity_pool), updateFunds);
        
        let liquidity_pool_address = signer::address_of(&liquidity_pool);
        let new_guid = guid::create_id(liquidity_pool_address, 8);
        let pool_details = PoolDetails {
            coin_type: coin_address<CoinType>(),
            deal_name: deal_name,
            principal: principal,
            borrower_address: borrower_address,
            financing_fee: financing_fee,
            deal_formation_period: deal_formation_period,
            deal_grace_period: deal_grace_period,
            repayment_period: repayment_period,
            credit_rating: credit_rating,
            loan_type: loan_type,
            tranches_structure: tranches_structure,
            senior_ratio: senior_ratio,
            junior_ratio: junior_ratio,
            senior_apr: senior_apr,
            junior_apr: junior_apr,
            senior_ceiling: senior_ceiling,
            junior_ceiling: junior_ceiling,
            resource_addr: liquidity_pool_address,
            deployer_address: account_addr,
            seeds: seeds,
            uid: new_guid,
            borrower_origination_fees: borrow_pool_distribution,
            lender_performance_fees: lender_performance_fees,
            isJuniorLocked: false,
            isActivated: false,
            isActivatedTimeStamp: 0,
            status: string::utf8(b"Open For Funding"),
        };

        let pool_signer_from_cap = account::create_signer_with_capability(&liquidity_pool_cap);

        let junior_tranche = JuniorTranche {
            current_amount: 0,
            interest_rate: junior_apr,
            capacity: junior_ceiling,
            isLocked: false,
            isFull: false,
            repayed_amount: 0,
            expected_return: ((junior_ceiling * junior_apr) / 100) + junior_ceiling,
            borrowed_amount: 0,
        };

        let senior_tranche = SeniorTranche {
            current_amount: 0,
            interest_rate: senior_apr,
            capacity: senior_ceiling, // Remaining capacity for senior tranche
            isLocked: true,
            isFull: false,
            repayed_amount: 0,
            expected_return: (( senior_ceiling * senior_apr) / 100) + senior_ceiling,
            borrowed_amount: 0,
            isActivated: false,
        };

        let tranches = Tranches {
            junior: junior_tranche,
            senior: senior_tranche,
        };
        //id deployer address does not have tranchemap then create a new tranchemap which contain the current tranches details and liquidity_pool_address as address
        if(!exists<TrancheMap>(account_addr)){
            let pool_tranches = simple_map::new();
            simple_map::add(&mut pool_tranches, liquidity_pool_address, tranches);
            move_to<TrancheMap>(account, TrancheMap { pool_tranches });
        } else {
            let tranches_map_ref = borrow_global_mut<TrancheMap>(account_addr);
            simple_map::add(&mut tranches_map_ref.pool_tranches, liquidity_pool_address, tranches);
        };
        //move_to<Tranches>(account, tranches);
        //move_to(account, tranches);

        let whitelist = Whitelist {
            whitelist: vector::empty(),
        };
        if(!exists<Whitelist>(account_addr)){
            move_to<Whitelist>(account, whitelist);
        };
        if(!exists<LiquidityPools>(account_addr))
        {
            let pools = vector[];
            vector::push_back(&mut pools, pool_details);
            move_to<LiquidityPools>(account, LiquidityPools{pools});
        } else {
            let pools = borrow_global_mut<LiquidityPools>(account_addr);
            vector::push_back(&mut pools.pools, pool_details);
        };
        move_to<LiquidityPoolCap>(&pool_signer_from_cap, LiquidityPoolCap{
            liquidity_pool_cap: liquidity_pool_cap
        });
        managed_coin::register<CoinType>(&pool_signer_from_cap); 
        
        if(!exists<AdminEvents>(account_addr))
        {
            let event = AdminEvent {
                timestamp: timestamp::now_seconds(),
                pool_name: deal_name,
                principal: principal,
                financing_fee: financing_fee,
                deal_formation_period: deal_formation_period,
                deal_grace_period: deal_grace_period,
                user_address: account_addr,
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<AdminEvents>(account, AdminEvents{events});
        } 
        else {
            let events = borrow_global_mut<AdminEvents>(account_addr); 
            vector::push_back(&mut events.events, AdminEvent{
                timestamp: timestamp::now_seconds(),
                pool_name: deal_name,
                principal: principal,
                financing_fee: financing_fee,
                deal_formation_period: deal_formation_period,
                deal_grace_period: deal_grace_period,
                user_address: account_addr,
            });
                    
        };
    }

    public entry fun add_to_whitelist(account: &signer, addresses: vector<address>) acquires Whitelist {
        let whitelist = borrow_global_mut<Whitelist>(signer::address_of(account));
        let i = 0;
        let len = vector::length(&addresses);
        while (i < len) {
            let addr = vector::borrow(&addresses, i);
            vector::push_back(&mut whitelist.whitelist, *addr);
            i = i + 1;
        };
    }
    //To check if the user is whitelisted
    #[view]
    public fun is_whitelisted(user_address: address): bool acquires Whitelist {
        let whitelist = borrow_global<Whitelist>(user_address);
        let i = 0;
        let len = vector::length(&whitelist.whitelist);
        while (i < len) {
            let addr = vector::borrow(&whitelist.whitelist, i);
            if (*addr == user_address) {
                return true
            };
            i = i + 1;
        };
        return false
    }

    //function to get the pool name from the pool address
    fun get_pool_name(deployer_address: address, pool_address: address): String acquires LiquidityPools {
        let pools = borrow_global<LiquidityPools>(deployer_address);
        let i = 0;
        let len = vector::length(&pools.pools);
        while (i < len) {
            let pool = vector::borrow(&pools.pools, i);
            if (pool.resource_addr == pool_address) {
                return pool.deal_name
            };
            i = i + 1;
        };
        return string::utf8(b"Pool Name Not Found")
    }
    public entry fun juniorDeposit<CoinType>(account:&signer, pool_address: address, amount:u64, deployer_address:address)acquires UserPools,Capabilities, UserEvents, TrancheMap, InvestorPortfolio, LiquidityPools{
        //check if new user contain global tranches struct data or not
        let signer_address = signer::address_of(account);
       
        // if the user already has the global tranches struct data then it will take the data from the user account
        let updatedAmount=amount*BASE_APTOS_PRICE;
        // get the tranches data from the pool address because the pool address is the key for the tranches data
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        //write code go borrow_global_mut<TrancheMap> and get reference for the pool address of the pool_tranches and update the junior tranche current amount

        //if the current amount is equal to the capacity of junior tranche then it locks the junior tranche
        assert!(!tranches.junior.isLocked, error::not_found(EJUNIOR_TRANCHE_LOCKED));
        if(amount > tranches.junior.capacity){
            assert!(false, error::not_found(EMORE_THAN_CAPACITY));
        };
        if(tranches.junior.current_amount + amount > tranches.junior.capacity){
            assert!(false, error::not_found(EMORE_THAN_CAPACITY));
        }else if(tranches.junior.current_amount + amount == tranches.junior.capacity) {
            tranches.junior.isFull = true;
            tranches.junior.isLocked = true;
            tranches.senior.isLocked = false;
            tranches.junior.current_amount = tranches.junior.current_amount + amount;
            let pools = borrow_global_mut<LiquidityPools>(deployer_address);
            let i = 0;
            let len = vector::length(&pools.pools);
            while (i < len) {
                let pool = vector::borrow_mut(&mut pools.pools, i);
                if (pool.resource_addr == pool_address) {
                //update the isJuniorLocker status of the pool
                    pool.isJuniorLocked = true;
                    break
                };
                i = i + 1;
            };
        }else{
            tranches.junior.current_amount = tranches.junior.current_amount + amount;
        };
        if (!coin::is_account_registered<AptosXCoin>(signer_address)) {
            coin::register<AptosXCoin>(account);
        };
        let pool_name=get_pool_name(deployer_address, pool_address);
        if(!exists<UserPools>(signer_address))
        {
           managed_coin::register<CoinType>(account);    
            let pool = UserPool {
               pool_address,
               total_deposit: amount,
               timestamp: timestamp::now_seconds(),
                pool_name: pool_name,
                interest_rate: tranches.junior.interest_rate,
                term: string::utf8(b"Monthly"),
                maturity: string::utf8(b"TBA"),
            };          
            let pools = vector[];
            vector::push_back(&mut pools, pool);          
            move_to<UserPools>(account, UserPools{pools});
        } 
        else {
            let pool = borrow_global_mut<UserPools>(signer_address); 
            let count = 0;
            let pool_length = vector::length(&pool.pools);
            while(count < pool_length) {
                let pool = vector::borrow_mut(&mut pool.pools, count);
                if(pool.pool_address == pool_address) {
                    pool.total_deposit = pool.total_deposit + amount;
                    break
                };   
                count = count + 1;
            }           
        };
        coin::transfer<CoinType>(account, pool_address, updatedAmount); 
        // Mint Junior Coin
        let mod_account = @panther;
        assert!(
            exists<Capabilities>(mod_account),
            error::not_found(ENO_CAPABILITIES),
        );  
        //update the current amount of the deployer address with mut resource of the junior tranche
        let capabilities = borrow_global<Capabilities>(mod_account);
        let coins_minted = coin::mint(updatedAmount, &capabilities.mint_cap);
        coin::deposit(signer_address, coins_minted); 
        let tranche_type=string::utf8(b"Junior");
        let transaction_type=string::utf8(b"Deposit");
        // store the event in the global resource if not exist create otherwise push the event in the vector
        if(!exists<UserEvents>(signer_address))
        {
            let event = UserEvent {
               timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<UserEvents>(account, UserEvents{events});
        } 
        else {
            let events = borrow_global_mut<UserEvents>(signer_address); 
            vector::push_back(&mut events.events, UserEvent{
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            });
                    
        };
        emit(DepositEvent{
            user: signer_address,
            pool_address: pool_address,
            amount: amount,
            timestamp: timestamp::now_seconds(),
            tranche: tranche_type
        });

        // investor portfolio
        if(!exists<InvestorPortfolio>(signer_address))
        {
            let portfolio_distribution = PortfolioDistribution {
                no_of_pools: 1,
                allocation_amount: amount,
                pool_distribution: vector[PoolDistribution{pool_address: pool_address, amount_invested: amount}],
                interest_distribution: vector[InterestDistribution{pool_address: pool_address, interest_earned: amount*tranches.junior.interest_rate}], 
            };
            let invest_histories = vector[InvestHistory{amount: amount, timestamp: timestamp::now_seconds()}];
            move_to<InvestorPortfolio>(account, InvestorPortfolio{
                total_portfolio_value: amount,
                total_interest_earned: (amount*tranches.junior.interest_rate)/100,
                weighted_apy: 0,
                invest_history: invest_histories,
                portfolio_distribution: portfolio_distribution,
            });
        } else {
            let investor_portfolio = borrow_global_mut<InvestorPortfolio>(signer_address);

            // if it is investing in same pool again then just change the amount and interest earned and history of same pool 
            let count = 0;
            let pool_length = vector::length(&investor_portfolio.portfolio_distribution.pool_distribution);
            while(count < pool_length) {
                let pool = vector::borrow_mut(&mut investor_portfolio.portfolio_distribution.pool_distribution, count);

                if(pool.pool_address == pool_address) {
                    pool.amount_invested = pool.amount_invested + amount;
                    investor_portfolio.portfolio_distribution.allocation_amount = investor_portfolio.portfolio_distribution.allocation_amount + amount;
                    investor_portfolio.total_portfolio_value = investor_portfolio.total_portfolio_value + amount;
                    investor_portfolio.total_interest_earned = investor_portfolio.total_interest_earned + (amount*tranches.junior.interest_rate)/100;
                    investor_portfolio.weighted_apy = investor_portfolio.total_interest_earned / investor_portfolio.total_portfolio_value;
                    vector::push_back(&mut investor_portfolio.invest_history, InvestHistory{amount: amount, timestamp: timestamp::now_seconds()});
                    break
                };   
                count = count + 1;
            };
            //else add the new pool to the portfolio distribution
            if(count == pool_length){
                vector::push_back(&mut investor_portfolio.portfolio_distribution.pool_distribution, PoolDistribution{pool_address: pool_address, amount_invested: amount});
                investor_portfolio.portfolio_distribution.no_of_pools = investor_portfolio.portfolio_distribution.no_of_pools + 1;
                investor_portfolio.portfolio_distribution.allocation_amount = investor_portfolio.portfolio_distribution.allocation_amount + amount;
                investor_portfolio.total_portfolio_value = investor_portfolio.total_portfolio_value + amount;
                investor_portfolio.total_interest_earned = investor_portfolio.total_interest_earned + (amount*tranches.junior.interest_rate)/100;
                investor_portfolio.weighted_apy = investor_portfolio.total_interest_earned / investor_portfolio.total_portfolio_value;
                vector::push_back(&mut investor_portfolio.invest_history, InvestHistory{amount: amount, timestamp: timestamp::now_seconds()});
            };
        };

    }
    // function to change isFull and isLocked Status of Junior and Senior Tranche and also update the pool details
    public entry fun lockJuniorTranche(deployer_address: address, pool_address: address) acquires TrancheMap, LiquidityPools {

        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        tranches.junior.isFull = true;
        tranches.junior.isLocked = true;
        tranches.senior.isFull = false;
        tranches.senior.isLocked = false;

        //update the pool details of the following pool with same pool address
        let pools = borrow_global_mut<LiquidityPools>(deployer_address);
        let i = 0;
        let len = vector::length(&pools.pools);
        while (i < len) {
            let pool = vector::borrow_mut(&mut pools.pools, i);
            if (pool.resource_addr == pool_address) {
                //update the isJuniorLocker status of the pool
                pool.isJuniorLocked = true;
                break
            };
            i = i + 1;
        };
    }
    //change the status of senior tranche also when it's full
    public entry fun lockSeniorTranche(deployer_address:address, pool_address:address) acquires TrancheMap {
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        tranches.senior.isFull = true;
        tranches.senior.isLocked = true;
    }
    //function to activate the senior tranche same as lock senior
    public entry fun activateSeniorTranche(deployer_address:address, pool_address:address) acquires TrancheMap, LiquidityPools {
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        //check if the junior tranches isLocked or not
        //assert!(tranches.junior.isLocked, error::not_found(EJUNIOR_TRANCHE_NOT_LOCKED));
        //check if the junior tranches isFull or not
        //assert!(tranches.senior.isLocked, error::not_found(ESENIOR_TRANCHE_NOT_LOCKED));
        //check the amount of junior and senior should be equal to the principal amount
        tranches.senior.isActivated = true;
        tranches.senior.isLocked = true;
        tranches.senior.isFull = true;
        //update the pool details of the following pool with same pool address
        let pools = borrow_global_mut<LiquidityPools>(deployer_address);
        let i = 0;
        let len = vector::length(&pools.pools);
        while (i < len) {
            let pool = vector::borrow_mut(&mut pools.pools, i);
            if (pool.resource_addr == pool_address) {
                //check the amount of junior and senior should be equal to the principal amount
                //assert!(tranches.junior.current_amount + tranches.senior.current_amount == pool.principal, error::not_found(EMORE_THAN_CAPACITY));
                //update the isJuniorLocker status of the pool
                pool.isActivated = true;
                pool.isJuniorLocked=false;
                pool.isActivatedTimeStamp = timestamp::now_seconds();
                pool.status = string::utf8(b"In Progress");
                break
            };
            i = i + 1;
        };
    }

    //public entry fun 
    //function to check the junior tranche current amount
    #[view]
    public fun getJuniorTrancheCurrentAmount(account:address) : u64 acquires Tranches {
        let tranches = borrow_global_mut<Tranches>(account);
        tranches.junior.current_amount
    }
    //function to check the junior tranche capacity
    #[view]
    public fun getJuniorTrancheCapacity(account:address) : u64 acquires Tranches {
        let tranches = borrow_global_mut<Tranches>(account);
        tranches.junior.capacity
    }
    //function to check the senior tranche current amount
    #[view]
    public fun getSeniorTrancheCurrentAmount(account: address) : u64 acquires Tranches {
        let tranches = borrow_global<Tranches>(account);
        tranches.senior.current_amount
    }
    //function to check the senior tranche capacity
    #[view]
    public fun getSeniorTrancheCapacity(account: address) : u64 acquires Tranches {
        let tranches = borrow_global<Tranches>(account);
        tranches.senior.capacity
    }
    public entry fun seniorDeposit<CoinType>(account: &signer, pool_address: address, amount: u64, deployer_address:address) acquires UserPools, TrancheMap, SeniorCapabilities, UserEvents, LiquidityPools{
        let updatedAmount=amount*BASE_APTOS_PRICE;
        let signer_address = signer::address_of(account);
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        //check if junior tranches isLocked or not
        //if junior tranches isLocked, then senior tranches can be deposited
        //assert condition to check if junior islocked value is true or not
        assert!(tranches.junior.isLocked, error::not_found(EJUNIOR_TRANCHE_NOT_LOCKED));
        //assert condition to check if junior isFull value is true or not
        assert!(tranches.junior.isFull, error::not_found(EJUNIOR_TRANCHE_FULL));
        //check condition if amount is greater than senior capacity 
        if(amount > tranches.senior.capacity){
                assert!(false, error::not_found(EMORE_THAN_CAPACITY));
        };
        //check if amount and current amount of senior tranches is less than capacity
        if(tranches.senior.current_amount + amount > tranches.senior.capacity){
                assert!(false, error::not_found(EMORE_THAN_CAPACITY));
        }else{
            tranches.senior.current_amount = tranches.senior.current_amount + amount;
        };
        //let resource_addr = borrow_global<LiquidityPoolMap>(@qiro).liquidity_pool_address;
        if (!coin::is_account_registered<SeniorXCoin>(signer_address)) {
            coin::register<SeniorXCoin>(account);
        };
        
        let pool_name=get_pool_name(deployer_address, pool_address);
        //To check if the user is whitelisted
        if(!exists<UserPools>(signer_address))
        {
           managed_coin::register<CoinType>(account);    
            let pool = UserPool {
               pool_address,
               total_deposit: amount,
               timestamp: timestamp::now_seconds(),
                pool_name: pool_name,
                interest_rate: tranches.senior.interest_rate,
                term: string::utf8(b"Monthly"),
                maturity: string::utf8(b"TBA"),
            };          
            let pools = vector[];
            vector::push_back(&mut pools, pool);            
            move_to<UserPools>(account, UserPools{pools});
        } 
        else {
            let pool = borrow_global_mut<UserPools>(signer_address); 
            let count = 0;
            let pool_length = vector::length(&pool.pools);
            while(count < pool_length) {
                let pool = vector::borrow_mut(&mut pool.pools, count);
                if(pool.pool_address == pool_address) {
                    pool.total_deposit = pool.total_deposit + amount;
                    break
                };   
                count = count + 1;
            }           
        };
        //mint a coin
        //managed_coin::mint<LPCoin>(account,signer_address, amount);
        coin::transfer<CoinType>(account, pool_address, updatedAmount); 

        // Mint Senior Coin
        let mod_account = @panther;
        assert!(
            exists<SeniorCapabilities>(mod_account),
            error::not_found(ENO_CAPABILITIES),
        );
        let capabilities = borrow_global<SeniorCapabilities>(mod_account);
        let coins_minted = coin::mint(updatedAmount, &capabilities.mint_cap);
        coin::deposit(signer_address, coins_minted);
        let tranche_type=string::utf8(b"Senior");
        let transaction_type=string::utf8(b"Deposit");
        // store the event in the global resource if not exist create otherwise push the event in the vector
        if(!exists<UserEvents>(signer_address))
        {
            let event = UserEvent {
               timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<UserEvents>(account, UserEvents{events});
        } 
        else {
            let events = borrow_global_mut<UserEvents>(signer_address); 
            vector::push_back(&mut events.events, UserEvent{
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            });
                    
        };
        emit(DepositEvent{
            user: signer_address,
            pool_address: pool_address,
            amount: amount,
            timestamp: timestamp::now_seconds(),
            tranche: tranche_type
        }); 
    }
    public entry fun juniorRedeem<CoinType>( account: &signer, pool_address: address, amount: u64, deployer_address:address) acquires UserPools, LiquidityPoolCap, Capabilities,TrancheMap, UserEvents {
        //check with assert condition first if junior tranches is not locked if locked then user cannot redeem
        let updatedAmount=amount*BASE_APTOS_PRICE;
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        let isjuniortrancheLocked = tranches.junior.isLocked;
        assert!(!isjuniortrancheLocked, error::not_found(EJUNIOR_TRANCHE_LOCKED));
        let account_addr= signer::address_of(account);
        //let newAmount = amount;

        let pool = borrow_global_mut<LiquidityPoolCap>(pool_address);

        let pool_signer_from_cap = account::create_signer_with_capability(&pool.liquidity_pool_cap);
        //if user pools doesn't exist on redeem means the user has not deposited any amount in the pool so throw an error 
        if(!exists<UserPools>(account_addr))
        {
            assert!(false, error::not_found(ENOT_DEPOSITED));
        };
        //the amount should be less than the deposited amount by the user if not throw an error

        let user_pools = borrow_global_mut<UserPools>(account_addr); 
            let count = 0;
            let pool_length =  vector::length(&user_pools.pools);
            while(count < pool_length) {
                let pool = vector::borrow_mut(&mut user_pools.pools, count);
                if(pool.pool_address == pool_address) {
                    //calculate the interest
                    //amount should be less than the total deposit of the user
                    assert!(amount <= pool.total_deposit, error::not_found(EINVALID_AMOUNT));
                    //let time= timestamp::now_seconds() - pool.timestamp;
                    //let interest_amount = (pool.total_deposit * INTEREST_RATE * time) / (100 * 365 * 24 * 60 * 60);
                    pool.total_deposit = pool.total_deposit - amount;
                    // newAmount = amount + interest_amount;
                    break
                };
                count = count + 1;
            };
        //update the current amount of the junior tranche resource if tranches exist
        if(exists<TrancheMap>(deployer_address)){
            tranches.junior.current_amount = tranches.junior.current_amount - amount;
        };
        // Burn aptosx
        let coin = coin::withdraw<AptosXCoin>(account, updatedAmount);
        let mod_account = @panther;
        assert!(
            exists<Capabilities>(mod_account),
            error::not_found(ENO_CAPABILITIES),
        );
        let capabilities = borrow_global<Capabilities>(mod_account);
        coin::burn<AptosXCoin>(coin, &capabilities.burn_cap);  

        coin::transfer<CoinType>(&pool_signer_from_cap, account_addr, updatedAmount);
        //managed_coin::burn<LPCoin>(account, amount);
        let tranche_type=string::utf8(b"Junior");
        let transaction_type=string::utf8(b"Redeem");
        // store the event in the global resource if not exist create otherwise push the event in the vector
        if(!exists<UserEvents>(account_addr))
        {
            let event = UserEvent {
               timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: account_addr,
                event_type: transaction_type,
                tranche: tranche_type
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<UserEvents>(account, UserEvents{events});
        } 
        else {
            let events = borrow_global_mut<UserEvents>(account_addr); 
            vector::push_back(&mut events.events, UserEvent{
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: account_addr,
                event_type: transaction_type,
                tranche: tranche_type
            });
                    
        };
        emit(RedeemEvent{
            user: account_addr,
            pool_address: pool_address,
            amount: amount,
            timestamp: timestamp::now_seconds(),
            tranche: tranche_type
        }); 
    }
    public entry fun seniorRedeem<CoinType>( account: &signer, pool_address: address, amount: u64, deployer_address:address) acquires UserPools, LiquidityPoolCap, SeniorCapabilities, TrancheMap, UserEvents {
        //check with assert condition first if senior tranches is not locked if locked then user cannot redeem
        let updatedAmount=amount*BASE_APTOS_PRICE;
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        let isseniortrancheLocked = tranches.senior.isLocked;
        //if senior tranches is locked then user cannot redeem
        assert!(!isseniortrancheLocked, error::not_found(ESENIOR_TRANCHE_LOCKED));
        let account_addr= signer::address_of(account);
        let pool = borrow_global_mut<LiquidityPoolCap>(pool_address);
        let pool_signer_from_cap = account::create_signer_with_capability(&pool.liquidity_pool_cap);

        //if user pools doesn't exist on redeem means the user has not deposited any amount in the pool so throw an error
        if(!exists<UserPools>(account_addr))
        {
            assert!(false, error::not_found(ENOT_DEPOSITED));
        };
        let user_pools = borrow_global_mut<UserPools>(account_addr); 
            let count = 0;
            let pool_length =  vector::length(&user_pools.pools);
            while(count < pool_length) {
                let pool = vector::borrow_mut(&mut user_pools.pools, count);
                if(pool.pool_address == pool_address) {
                    assert!(amount <= pool.total_deposit, error::not_found(EINVALID_AMOUNT));
                    //calculate the interest
                    //let time= timestamp::now_seconds() - pool.timestamp;
                    //let interest_amount = (pool.total_deposit * INTEREST_RATE * time) / (100 * 365 * 24 * 60 * 60);
                    pool.total_deposit = pool.total_deposit - amount;
                    amount = amount;
                    break
                };
                count = count + 1;
            };
        //update the current amount of the senior tranche resource if tranches exist
        if(exists<TrancheMap>(deployer_address)){
            tranches.senior.current_amount = tranches.senior.current_amount - amount;
        };
        // Burn aptosx
        let coin = coin::withdraw<SeniorXCoin>(account, updatedAmount);
        let mod_account = @panther;
        assert!(
            exists<SeniorCapabilities>(mod_account),
            error::not_found(ENO_CAPABILITIES),
        );
        let capabilities = borrow_global<SeniorCapabilities>(mod_account);
        coin::burn<SeniorXCoin>(coin, &capabilities.burn_cap);  

        coin::transfer<CoinType>(&pool_signer_from_cap, account_addr, updatedAmount);
        //managed_coin::burn<LPCoin>(account, amount);
        let tranche_type=string::utf8(b"Senior");
        let transaction_type=string::utf8(b"Redeem");
        // store the event in the global resource if not exist create otherwise push the event in the vector
        if(!exists<UserEvents>(account_addr))
        {
            let event = UserEvent {
               timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: account_addr,
                event_type: transaction_type,
                tranche: tranche_type
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<UserEvents>(account, UserEvents{events});
        } 
        else {
            let events = borrow_global_mut<UserEvents>(account_addr); 
            vector::push_back(&mut events.events, UserEvent{
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: account_addr,
                event_type: transaction_type,
                tranche: tranche_type
            });
                    
        };
        emit(RedeemEvent{
            user: account_addr,
            pool_address: pool_address,
            amount: amount,
            timestamp: timestamp::now_seconds(),
            tranche: tranche_type
        }); 
    }
    public entry fun borrow<CoinType>(account: &signer, pool_address: address, amount: u64, deployer_address:address) acquires  LiquidityPoolCap, BorrowPools, TrancheMap, LiquidityPools, BorrowerEvents, BorrowerPortfolio {
        let updatedAmount=amount*BASE_APTOS_PRICE;
        let signer_address= signer::address_of(account);
        
        //get signer of the pool and sign on the behalf of the pool
        let pool = borrow_global_mut<LiquidityPoolCap>(pool_address);
        let pool_signer_from_cap = account::create_signer_with_capability(&pool.liquidity_pool_cap);
        
        //get the tranches data from the pool address because the pool address is the key for the tranches data
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);

        //variables 
        let total_capacity: u64=0;
        let interest_rate: u64=0;
        let total_periods: u64=0;
        
        // get the pool details from the liquidity pool and find the pool address and get the pool details of that pool and use it in borrow function
        let pool_details = borrow_global<LiquidityPools>(deployer_address);
        let pool_length = vector::length(&pool_details.pools);
        let loan_start_time: u64=0;
        let i = 0;
        while(i < pool_length) {
            let pool = vector::borrow(&pool_details.pools, i);
            if(pool.resource_addr == pool_address) {
                total_capacity = pool.principal;
                interest_rate = pool.financing_fee;
                total_periods = pool.repayment_period;
                loan_start_time=pool.isActivatedTimeStamp;
            };
            i = i + 1;
        };     
        //check both tranches are locked or not if locked allow to borrow otherwise not
        //let deployer_tranche = borrow_global_mut<Tranches>(deployer_address);
        assert!(tranches.junior.isLocked, error::not_found(EJUNIOR_TRANCHE_NOT_LOCKED));
        assert!(tranches.senior.isFull, error::not_found(ESENIOR_TRANCHE_NOT_LOCKED));

        //check if senior tranche is activated or not
        assert!(tranches.senior.isActivated, error::not_found(ESENIOR_TRANCHE_NOT_ACTIVATED));

        // check if the amount is less than the TOTAL_CAPACITY 
        assert!(amount < total_capacity, error::not_found(EMORE_THAN_TOTAL_CAPACITY));
        // calculate the current amount of the junior and senior tranches
        let current_amount_available = tranches.junior.current_amount + tranches.senior.current_amount;
        // check the amount should always be less than the current_amount_available to borrow
        assert!(amount < current_amount_available, error::not_found(EMORE_THAN_CAPACITY)); 
        //calculate the interest
        let interest_amount = (total_capacity * interest_rate) / 100;
        let total_amount_for_period = (total_capacity + interest_amount) / total_periods;
        //calculate the interest amount for the peroiod of the loan
        let interest_amount_per_period = (interest_amount / total_periods);
        let tranche_type=string::utf8(b"Senior");
        let pool_name=get_pool_name(deployer_address, pool_address);
        //let borrow_pools= borrow_global_mut<BorrowPools>(signer_address);
        if(!exists<BorrowPools>(signer_address)){
            let pools = vector[];
            vector::push_back(&mut pools, BorrowPool{
                pool_name: pool_name,
                current_amount_available: current_amount_available,
                pool_address,
                total_amount_per_period: total_amount_for_period,
                interest_per_period: interest_amount_per_period,
                ratePerSecond: INTEREST_RATE,
                total: amount + interest_amount,    // total means pricipal + interest
                prinicipalAmount: amount,
                interestAmount: interest_amount,  
                totalRepayedAmount: 0,
                totalPrincipalRepayed: 0,
                totalInterestRepayed: 0,
                totalPeriod: total_periods,
                loanTerm: 0, //  remove 
                currentPeriod: 1,
                lateFeeInterestRate: 0,
                gracePeriod: 0, // graces should be days
                totalInterestForLoanTerm: 0,
                loan_start_time: loan_start_time,
                loan_next_payment_time: timestamp::now_seconds() + MONTH_IN_SECONDS,
                loanEnded: false,
                isBulletRepay: false
            });
            if(amount < tranches.junior.current_amount){
                        tranches.junior.borrowed_amount = tranches.junior.borrowed_amount + amount;
                        tranches.junior.current_amount = tranches.junior.current_amount - amount;
                        tranche_type=string::utf8(b"Junior");
                    } else if(tranches.junior.current_amount > 0) {
                        //first take amount from junior current amount and reamining amount from senior current amount
                        let remaining_amount = tranches.junior.current_amount;
                        let updated_amount = amount - remaining_amount;
                        tranches.junior.borrowed_amount = tranches.junior.borrowed_amount + remaining_amount;
                        tranches.junior.current_amount = tranches.junior.current_amount - remaining_amount;
                        //take the updated amount from senior current amount
                        tranches.senior.borrowed_amount = tranches.senior.borrowed_amount + updated_amount;
                        tranches.senior.current_amount = tranches.senior.current_amount - updated_amount;
                        tranche_type=string::utf8(b"Junior-Senior");
                    } else {
                        // if junior current amount is 0 then take the amount from senior current amount and also write checks when it's current amount should always be greater than 0 and when it's reach to 0 then borrower cannot borrow more amount
                        if(tranches.senior.current_amount > 0 && amount <= tranches.senior.current_amount){
                            tranche_type=string::utf8(b"Senior");
                            tranches.senior.borrowed_amount = tranches.senior.borrowed_amount + amount;
                            tranches.senior.current_amount = tranches.senior.current_amount - amount;
                        } else {
                            assert!(false, error::not_found(EREACHED_BORROW_LIMIT));
                        }
                    };
            move_to<BorrowPools>(account, BorrowPools{pools});
        } else {
            let pool = borrow_global_mut<BorrowPools>(signer_address);
            let interest_amount = (amount * INTEREST_RATE) / 100;
            let count = 0;
            let pool_length = vector::length(&pool.pools);
            while(count < pool_length) {
                let pool = vector::borrow_mut(&mut pool.pools, count);
                if(pool.pool_address == pool_address) {
                    pool.total = pool.total + amount + interest_amount;
                    pool.prinicipalAmount = pool.prinicipalAmount + amount;   
                    pool.interestAmount = pool.interestAmount + interest_amount;
                    //amount should be less than capacity
                    assert!(amount + pool.total <= total_capacity, error::not_found(EMORE_THAN_TOTAL_CAPACITY));
                    //update the borrowed amount of the junior and senior tranches. First the junior tranche borrowed amount is updated when the borrowed amount is equals to the current amount then if the borrowed amount of is greater than current amount take the some amount from junior tranche until it's borrowed amount is equals to current amount then take remaining amount from senior tranche
                    if(amount < tranches.junior.current_amount){
                        tranches.junior.borrowed_amount = tranches.junior.borrowed_amount + amount;
                        tranches.junior.current_amount = tranches.junior.current_amount - amount;
                    } else if(tranches.junior.current_amount > 0) {
                        //first take amount from junior current amount and reamining amount from senior current amount
                        let remaining_amount = tranches.junior.current_amount;
                        let updated_amount = amount - remaining_amount;
                        tranches.junior.borrowed_amount = tranches.junior.borrowed_amount + remaining_amount;
                        tranches.junior.current_amount = tranches.junior.current_amount - remaining_amount;
                        //take the updated amount from senior current amount
                        tranches.senior.borrowed_amount = tranches.senior.borrowed_amount + updated_amount;
                        tranches.senior.current_amount = tranches.senior.current_amount - updated_amount;
                    } else {
                        // if junior current amount is 0 then take the amount from senior current amount and also write checks when it's current amount should always be greater than 0 and when it's reach to 0 then borrower cannot borrow more amount
                        if(tranches.senior.current_amount > 0 && amount <= tranches.senior.current_amount){
                            tranches.senior.borrowed_amount = tranches.senior.borrowed_amount + amount;
                            tranches.senior.current_amount = tranches.senior.current_amount - amount;
                        } else {
                            assert!(false, error::not_found(EREACHED_BORROW_LIMIT));
                        }
                    };             
                    break
                };   
                count = count + 1;
            }
        };

        coin::transfer<CoinType>(&pool_signer_from_cap, signer_address, updatedAmount);
        //managed_coin::burn<LPCoin>(account, amount);

        let transaction_type=string::utf8(b"Borrow");
        if(!exists<BorrowerEvents>(signer_address))
        {
            let event = BorrowerEvent {
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<BorrowerEvents>(account, BorrowerEvents{events});
        } 
        else {
            let events = borrow_global_mut<BorrowerEvents>(signer_address); 
            vector::push_back(&mut events.events, BorrowerEvent{
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            });
        };
        // borrower portfolio
        if(!exists<BorrowerPortfolio>(signer_address))
        {
            let borrow_history = vector[BorrowHistory{
                amount: amount, 
                timestamp: timestamp::now_seconds()
            }];
            let borrow_pool_distribution= vector[BorrowPoolDistribution{
                pool_address: pool_address, 
                pool_name: pool_name, 
                amount_borrowed: amount
            }];
            let repay_history = vector::empty();
            
            move_to<BorrowerPortfolio>(account, BorrowerPortfolio{
                borrowed_amount: amount,
                repayed_amount: 0,
                total_available_amount: current_amount_available-amount,
                outstanding_loan_amount: amount,
                average_interest_rate: INTEREST_RATE,
                borrow_history: borrow_history,
                borrow_pool_distribution: borrow_pool_distribution,
                repayed_history: repay_history,
            });
        }else {
            let borrower_portfolio = borrow_global_mut<BorrowerPortfolio>(signer_address);
            let count = 0;
            let pool_length = vector::length(&borrower_portfolio.borrow_pool_distribution);
            while(count < pool_length) {
                let pool = vector::borrow_mut(&mut borrower_portfolio.borrow_pool_distribution, count);
                if(pool.pool_address == pool_address) {
                    pool.amount_borrowed = pool.amount_borrowed + amount;
                    break
                };   
                count = count + 1;
            };
            if(count == pool_length){
                vector::push_back(&mut borrower_portfolio.borrow_pool_distribution, BorrowPoolDistribution{
                    pool_address: pool_address, 
                    pool_name: pool_name, 
                    amount_borrowed: amount
                });
            };
            vector::push_back(&mut borrower_portfolio.borrow_history, BorrowHistory{
                amount: amount, 
                timestamp: timestamp::now_seconds()
            });
            borrower_portfolio.borrowed_amount = borrower_portfolio.borrowed_amount + amount;
            borrower_portfolio.outstanding_loan_amount = borrower_portfolio.outstanding_loan_amount + amount;
            borrower_portfolio.total_available_amount = borrower_portfolio.total_available_amount - amount;
        };

    }
    //repay function to repay the borrowed principal according to period of the borrower and when the current period is equal to total period then the borrower has to repay the total amount which includes total interest of the loan and remaining principal amount

    // when the loan is repayed it will first go to senior tranche repayment and then junior tranche repayment so we have to upadate the tranches repayed amount and update the below function named as repayLoan

    public entry fun repayLoan<CoinType>(account: &signer, pool_address: address, amount: u64, current_period:u64, deployer_address:address) acquires BorrowPools, TrancheMap, BorrowerEvents, LiquidityPools {
        let updatedAmount=amount*BASE_APTOS_PRICE;
        let signer_address = signer::address_of(account);
        let borrow_pools = borrow_global_mut<BorrowPools>(signer_address);
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        //let pool = borrow_global_mut<LiquidityPoolCap>(pool_address);
        //let pool_signer_from_cap = account::create_signer_with_capability(&pool.liquidity_pool_cap);
        let count = 0;
        let pool_length = vector::length(&borrow_pools.pools);
        let tranche_type=string::utf8(b"Senior");
        while(count < pool_length) {
            let pool = vector::borrow_mut(&mut borrow_pools.pools, count);
            if(pool.pool_address == pool_address) {
                    assert!(current_period < pool.totalPeriod && current_period==pool.currentPeriod, error::not_found(EINVALID_PERIOD_PAYMENT));
                    assert!(amount + pool.totalRepayedAmount <= pool.total, error::not_found(EINVALID_AMOUNT));
                    assert!(current_period==pool.currentPeriod, error::not_found(EINVALID_AMOUNT));
                    if(current_period==pool.totalPeriod){
                        assert!(amount == pool.prinicipalAmount + pool.interest_per_period, error::not_found(EINVALID_AMOUNT));
                        pool.totalRepayedAmount = pool.totalRepayedAmount + amount;
                        pool.totalPrincipalRepayed = pool.totalPrincipalRepayed + amount - pool.interest_per_period;
                        pool.totalInterestRepayed = pool.totalInterestRepayed + pool.interest_per_period;
                        pool.loanEnded=true;
                        //update the pooldetails status that the loan is ended
                        let pool_details = borrow_global_mut<LiquidityPools>(deployer_address);
                        let pool_length = vector::length(&pool_details.pools);
                        let i = 0;
                        while(i < pool_length) {
                            let pool = vector::borrow_mut(&mut pool_details.pools, i);
                            if(pool.resource_addr == pool_address) {
                                pool.status=string::utf8(b"Closed");
                            };
                            i = i + 1;
                        };
                    };
                    pool.totalRepayedAmount = pool.totalRepayedAmount + amount;
                    pool.totalPrincipalRepayed = pool.totalPrincipalRepayed + amount - pool.interest_per_period;
                    pool.totalInterestRepayed = pool.totalInterestRepayed + pool.interest_per_period;
                    pool.currentPeriod = pool.currentPeriod + 1;
                    //update the tranches repayed amount first the senior tranche repayment is done and when senior tranche expected return is equals to repayed amount it's then senior tranche repayment is done and after that junior tranche repayment is started
                    if(tranches.senior.repayed_amount + amount <= tranches.senior.expected_return){
                        tranches.senior.repayed_amount = tranches.senior.repayed_amount + amount;
                        tranches.senior.current_amount = tranches.senior.current_amount + amount;
                        tranche_type=string::utf8(b"Senior");
                    } else if(tranches.senior.expected_return - tranches.senior.repayed_amount > 0){ 
                        let remaining_amount = tranches.senior.borrowed_amount - tranches.senior.repayed_amount;
                        tranches.senior.repayed_amount = tranches.senior.repayed_amount + remaining_amount;
                        tranches.senior.current_amount = tranches.senior.current_amount + remaining_amount;
                        let updated_amount = amount - remaining_amount;
                        tranches.junior.repayed_amount = tranches.junior.repayed_amount + updated_amount;
                        tranches.senior.current_amount = tranches.senior.current_amount + updated_amount;
                        tranche_type=string::utf8(b"Senior-Junior");
                    }else{
                        //if senior tranche repayment is done then junior tranche repayment is started
                        if(amount + tranches.junior.repayed_amount <= tranches.junior.expected_return){
                            tranches.junior.repayed_amount = tranches.junior.repayed_amount + amount;
                            tranches.junior.current_amount = tranches.junior.current_amount + amount;
                            tranche_type=string::utf8(b"Junior");
                        }
                        else{
                            assert!(amount + tranches.junior.repayed_amount>tranches.junior.expected_return, error::not_found(EINVALID_AMOUNT));
                        }
                    };    
                    //update interest and repayed amount of the senior tranche
                    //coin::transfer<CoinType>(account, pool_address, amount);
                break
            };   
            count = count + 1;
        };
        //tranfer money back to the pool
        coin::transfer<CoinType>(account, pool_address, updatedAmount);
        let transaction_type=string::utf8(b"Repay Loan");
        if(!exists<BorrowerEvents>(signer_address))
        {
            let event = BorrowerEvent {
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<BorrowerEvents>(account, BorrowerEvents{events});
        } 
        else {
            let events = borrow_global_mut<BorrowerEvents>(signer_address); 
            vector::push_back(&mut events.events, BorrowerEvent{
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            });
        };
    }
    // repay function to pay the bullet loan all at once at the end of the total period of the loan term which includes both principal and interest amount at same time
    public entry fun repayBulletLoan<CoinType>(account: &signer, pool_address: address, amount: u64, current_period:u64, deployer_address:address) acquires BorrowPools, TrancheMap, BorrowerEvents, LiquidityPools {
        let updatedAmount=amount*BASE_APTOS_PRICE;
        let signer_address = signer::address_of(account);
        let borrow_pools = borrow_global_mut<BorrowPools>(signer_address);
        let tranches_map_ref = borrow_global_mut<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow_mut(&mut tranches_map_ref.pool_tranches, &pool_address);
        let tranche_type=string::utf8(b"Senior-Junior");
        //let pool = borrow_global_mut<LiquidityPoolCap>(pool_address);
        //let pool_signer_from_cap = account::create_signer_with_capability(&pool.liquidity_pool_cap);
        let count = 0;
        let pool_length = vector::length(&borrow_pools.pools);
        while(count < pool_length) {
            let pool = vector::borrow_mut(&mut borrow_pools.pools, count);
            if(pool.pool_address == pool_address) {
                    assert!(current_period <= pool.totalPeriod && current_period==pool.currentPeriod, error::not_found(EINVALID_PERIOD_PAYMENT));
                    if(current_period==pool.totalPeriod){
                        assert!(amount == pool.prinicipalAmount + pool.interest_per_period, error::not_found(EINVALID_AMOUNT));
                        pool.totalRepayedAmount = pool.totalRepayedAmount + amount;
                        pool.totalPrincipalRepayed = pool.totalPrincipalRepayed + amount - pool.interest_per_period;
                        pool.totalInterestRepayed = pool.totalInterestRepayed + pool.interest_per_period;
                        pool.loanEnded=true;
                        //update the pooldetails status that the loan is ended
                        let pool_details = borrow_global_mut<LiquidityPools>(deployer_address);
                        let pool_length = vector::length(&pool_details.pools);
                        let i = 0;
                        while(i < pool_length) {
                            let pool = vector::borrow_mut(&mut pool_details.pools, i);
                            if(pool.resource_addr == pool_address) {
                                pool.status=string::utf8(b"Closed");
                            };
                            i = i + 1;
                        };
                    };
                    assert!(amount + pool.totalRepayedAmount <= pool.total, error::not_found(EINVALID_AMOUNT));
                    assert!(current_period==pool.currentPeriod, error::not_found(EINVALID_AMOUNT));
                    pool.totalRepayedAmount = pool.totalRepayedAmount + amount;
                    // pool.totalPrincipalRepayed = pool.totalPrincipalRepayed + amount - pool.interest_per_period;
                    pool.totalInterestRepayed = pool.totalInterestRepayed + amount;
                    pool.currentPeriod = pool.currentPeriod + 1;
                    //update the tranches repayed amount first the senior tranche repayment is done and when senior tranche expected return is equals to repayed amount it's then senior tranche repayment is done and after that junior tranche repayment is started
                    if(tranches.senior.repayed_amount + amount <= tranches.senior.expected_return){
                        tranches.senior.repayed_amount = tranches.senior.repayed_amount + amount;
                        tranches.senior.current_amount = tranches.senior.current_amount + amount;
                        tranche_type=string::utf8(b"Senior");
                    } else if(tranches.senior.expected_return - tranches.senior.repayed_amount > 0){ 
                        let remaining_amount = tranches.senior.borrowed_amount - tranches.senior.repayed_amount;
                        tranches.senior.repayed_amount = tranches.senior.repayed_amount + remaining_amount;
                        tranches.senior.current_amount = tranches.senior.current_amount + remaining_amount;
                        let updated_amount = amount - remaining_amount;
                        tranches.junior.repayed_amount = tranches.junior.repayed_amount + updated_amount;
                        tranches.senior.current_amount = tranches.senior.current_amount + updated_amount;
                        tranche_type=string::utf8(b"Senior-Junior");
                    }else{
                        //if senior tranche repayment is done then junior tranche repayment is started
                        if(amount + tranches.junior.repayed_amount <= tranches.junior.expected_return){
                            tranches.junior.repayed_amount = tranches.junior.repayed_amount + amount;
                            tranches.junior.current_amount = tranches.junior.current_amount + amount;
                            tranche_type=string::utf8(b"Junior");
                        }
                        else{
                            assert!(amount + tranches.junior.repayed_amount>tranches.junior.expected_return, error::not_found(EINVALID_AMOUNT));
                        }
                    };    
                    //update interest and repayed amount of the senior tranche
                    //coin::transfer<CoinType>(account, pool_address, amount);
                break
            };   
            count = count + 1;
        };
        //tranfer money back to the pool
        coin::transfer<CoinType>(account, pool_address, updatedAmount);

        let transaction_type=string::utf8(b"Repay Bullet");
        if(!exists<BorrowerEvents>(signer_address))
        {
            let event = BorrowerEvent {
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            };          
            let events = vector[];
            vector::push_back(&mut events, event);          
            move_to<BorrowerEvents>(account, BorrowerEvents{events});
        } 
        else {
            let events = borrow_global_mut<BorrowerEvents>(signer_address); 
            vector::push_back(&mut events.events, BorrowerEvent{
                timestamp: timestamp::now_seconds(),
                pool_address: pool_address,
                amount: amount,
                user_address: signer_address,
                event_type: transaction_type,
                tranche: tranche_type
            });
        };
    }
    //function to get current period of the repayment loan of borrower

    //==============================================================================================
    // View functions
    //==============================================================================================

    #[view]
    public fun getCurrentPeriod(account: address, pool_address: address) : u64 acquires BorrowPools {
        let borrow_pools = borrow_global<BorrowPools>(account);
        let current_period = 0;
        let count = 0;
        let pool_length = vector::length(&borrow_pools.pools);
        while(count < pool_length) {
            let pool = vector::borrow(&borrow_pools.pools, count);
            if(pool.pool_address == pool_address) {
                current_period = pool.currentPeriod;
                break
            };   
            count = count + 1;
        };
        current_period
    }

    //function to get the emi for the current period with principal amount only
    #[view]
    public fun getEMIForPeriod(account: address, pool_address: address) : u64 acquires BorrowPools {
        let borrow_pools = borrow_global<BorrowPools>(account);
        let emi = 0;
        let count = 0;
        let pool_length = vector::length(&borrow_pools.pools);
        while(count < pool_length) {
            let pool = vector::borrow(&borrow_pools.pools, count);
            if(pool.pool_address == pool_address) {
                emi = pool.total / pool.totalPeriod;
                break
            };   
            count = count + 1;
        };
        emi
    }
    //function to get all repay amount for the borrower if the loan type is bullet repayment
    #[view]
    public fun getAmountForBullet(account: address, pool_address: address) : u64 acquires BorrowPools {
        let borrow_pools = borrow_global<BorrowPools>(account);
        let repay_amount = 0;
        let count = 0;
        let pool_length = vector::length(&borrow_pools.pools);
        while(count < pool_length) {
            let pool = vector::borrow(&borrow_pools.pools, count);
            if(pool.pool_address == pool_address) {
                repay_amount = pool.total;
                break
            };   
            count = count + 1;
        };
        repay_amount
    }
    //nav variable -> starting with 1:1 from pool value -> update nav function -> decrease when user files default -> increase when repayment is done then it's value is increased. 

    // calculate the junior token value from tranches repayed amount and capacity
    #[view]
    public fun getJuniorTokenValue(pool_address:address, deployer_address:address) : u64 acquires TrancheMap {
        let tranches_map_ref = borrow_global<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow(&tranches_map_ref.pool_tranches, &pool_address);
        let junior_token_value = (tranches.junior.repayed_amount * 100) / tranches.junior.capacity;
        junior_token_value
    }

    // calculate the senior token value from tranches repayed amount and capacity
    #[view]
    public fun getSeniorTokenValue(pool_address:address, deployer_address:address) : u64 acquires TrancheMap {
        let tranches_map_ref = borrow_global<TrancheMap>(deployer_address);
        let tranches = simple_map::borrow(&tranches_map_ref.pool_tranches, &pool_address);
        let senior_token_value = (tranches.senior.repayed_amount * 100) / tranches.senior.capacity;
        senior_token_value
    }

    //get all the pools from LiquidityPools which contains the vector of PoolDetails
    #[view]
    public fun getAllPools(account: address) : vector<PoolDetails> acquires LiquidityPools {
        let pools = borrow_global<LiquidityPools>(account);
        pools.pools
    }
    // #[test(account = @0xa11ce, fee = 100, seeds = vector::from_hex("0x1234"), funds = 1000]
    // fun test_deploy_pool(
    // account: signer,
    // fee: u64,
    // seeds: vector<u8>,
    // funds: u64
    // ) acquires LiquidityPoolMap , LiquidityPools {
    // let account_addr = signer::address_of(&account);
    // aptos_framework::account::create_account_for_test(account_addr);
    // aptos_framework::managed_coin::register<0x1::aptos_coin::AptosCoin>(&account);
    // }


}