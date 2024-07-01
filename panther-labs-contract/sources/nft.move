module panther::qiro {
    use aptos_framework::account::{Self, SignerCapability};
    use aptos_framework::object;
    use aptos_token_objects::collection;
    use aptos_token_objects::token;
    use std::option;
    use std::signer::address_of;
    use std::signer;
    use std::string::{Self, String, utf8};
    use std::vector;

    struct TokenIdentifier has key {
        mutator_ref: token::MutatorRef,
        burn_ref: token::BurnRef,
        document_name: String,
        description: String,
        portfolio_term: String,
        principal_amount: u64,
        no_of_loans: u64,
        total_principal_amount: u64,
        average_interest_rate: u64,
        portfolio_status: String,
        write_down: u64,
        write_off: u64,
        maturity_date: String,
    }

    // Tokens require a signer to create, so this is the signer for the collection
    struct CollectionCapability has key {
        capability: SignerCapability,
        burn_signer_capability: SignerCapability,
    }

    struct MintInfo has key {
        count: u64,
    }

    const APP_SIGNER_CAPABILITY_SEED: vector<u8> = b"APP_SIGNER_CAPABILITY";
    const BURN_SIGNER_CAPABILITY_SEED: vector<u8> = b"BURN_SIGNER_CAPABILITY";
    const COLLECTION_NAME: vector<u8> = b"Qiro Finance Collection";
    const COLLECTION_DESCRIPTION: vector<u8> = b"Qiro Finance Whitelist NFT";
    const COLLECTION_URI: vector<u8> = b"https://scarlet-live-iguana-759.mypinata.cloud/ipfs/QmNXMDmpoQvty8grDz8cv8Varu6JQw6ZR3aGYC4o3yV6MD";

    // This function is only callable during publishing
    fun init_module(account: &signer) {
        let (token_resource, token_signer_cap) = account::create_resource_account(
            account,
            APP_SIGNER_CAPABILITY_SEED,
        );
        let (_, burn_signer_capability) = account::create_resource_account(
            account,
            BURN_SIGNER_CAPABILITY_SEED,
        );

        move_to(account, CollectionCapability {
            capability: token_signer_cap,
            burn_signer_capability,
        });

        move_to(account, MintInfo{
            count: 0,
        });

        create_collection(&token_resource);
    }

    fun get_token_signer(): signer acquires CollectionCapability {
        account::create_signer_with_capability(&borrow_global<CollectionCapability>(@panther).capability)
    }

    // Create the collection that will hold all the NFTs
    fun create_collection(creator: &signer) {
        let description = string::utf8(COLLECTION_DESCRIPTION);
        let name = string::utf8(COLLECTION_NAME);
        let uri = string::utf8(COLLECTION_URI);

        collection::create_unlimited_collection(
            creator,
            description,
            name,
            option::none(),
            uri,
        );
    }

    // Create an token object
    public entry fun create_token(
        user: &signer, 
        document_name: String, 
        description: String,
        portfolio_term: String,
        principal_amount: u64,
        no_of_loans: u64,
        total_principal_amount: u64,
        average_interest_rate: u64,
        portfolio_status: String,
        write_down: u64,
        write_off: u64,
        maturity_date: String, 
        ) acquires CollectionCapability, MintInfo {

        let uri = string::utf8(COLLECTION_URI);
        let description = string::utf8(COLLECTION_DESCRIPTION);
        //let user_addr = address_of(user);
        let token_name = string::utf8(b"Qiro Token");
        let mint_info = borrow_global_mut<MintInfo>(@panther);
        let count = mint_info.count;
        let next_count = count + 1;
        string::append( &mut token_name, utf8(b" #"));
        string::append( &mut token_name, utf8(num_to_str(next_count)));

        let constructor_ref = token::create_named_token(
            &get_token_signer(),
            string::utf8(COLLECTION_NAME),
            description,
            token_name,
            option::none(),
            uri,
        );

        let token_signer = object::generate_signer(&constructor_ref);
        let mutator_ref = token::generate_mutator_ref(&constructor_ref);
        let burn_ref = token::generate_burn_ref(&constructor_ref);
        let transfer_ref = object::generate_transfer_ref(&constructor_ref);

        mint_info.count = next_count;

        // initialize/set default NFT struct values
        let token = TokenIdentifier {
            mutator_ref,
            burn_ref,
            document_name,
            description,
            portfolio_term,
            principal_amount,
            no_of_loans,
            total_principal_amount,
            average_interest_rate,
            portfolio_status,
            write_down,
            write_off,
            maturity_date,
        };

        move_to(&token_signer, token);

        object::transfer_with_ref(object::generate_linear_transfer_ref(&transfer_ref), address_of(user));
    }

     // Convert a number to a vector of bytes
    public fun num_to_str(num: u64):vector<u8>{
        let vec_data = vector::empty<u8>();
        while(true){
            vector::push_back( &mut vec_data, (num % 10 + 48 as u8));
            num = num / 10;
            if (num == 0){
                break
            }
        };
        vector::reverse<u8>(&mut vec_data);
        vec_data
    }
}