import { GraphQLClient } from 'graphql-request';

// Define the types for the GraphQL response
interface Shop {
  name: string;
  email: string;
  domain: string;
  myshopifyDomain: string;
  createdAt: string;
  currencyCode: string;
}

interface ShopifyResponse {
  shop: Shop;
}

const endpoint = process.env.SHOPIFY_APP 
const accessToken = process.env.SHOPIFY_TOKEN

// Initialize the GraphQL client
const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Access-Token': accessToken,
    'Content-Type': 'application/json',
  },
});

// Define the GraphQL query
const query = `
  query {
    shop {
      name
      email
      domain
      myshopifyDomain
      createdAt
      currencyCode
    }
  }
`;

// Function to fetch shop details
async function fetchShopDetails(): Promise<void> {
  try {
    const data = await client.request<ShopifyResponse>(query);
    console.log('Shop details:', data.shop);
  } catch (error) {
    console.error('Error fetching shop details:', error);
  }
}

// Fetch and log shop details
fetchShopDetails();
