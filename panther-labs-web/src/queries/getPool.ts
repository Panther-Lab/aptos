import { gql } from "@apollo/client";

export const getPoolsQuery = gql`
  query {
    pools {
      blockTimestamp
      capitalFormationPeriodEnd
      gracePeriod
      id
      interestRepaid
      juniorTranche {
        blockTimestamp
        id
        poolId
        tokenAddress
        tokenPrice
        totalBalance
        totalTokenSupply
        trancheAddress
        trancheType
      }
      loanMaturityTimestamp
      loanTerm
      operator
      periodCount
      periodLength
      poolId
      poolStatus
      principalRepaid
      seniorRate
      seniorTranche {
        blockTimestamp
        id
        poolId
        tokenAddress
        tokenPrice
        totalBalance
        totalTokenSupply
        trancheAddress
        trancheType
      }
      shelf
      startTimestamp
      totalBalance
      totalRepaid
      transactionHash
    }
  }
`;
