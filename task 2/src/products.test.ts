import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface DefectReport {
  id: number;
  title: string;
  defects: string[];
}

describe('FakeStore API Product Tests', () => {
  let products: Product[];
  let defectiveProducts: DefectReport[] = [];

  beforeAll(async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      products = response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  });

  test('Server should respond with status code 200', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    expect(response.status).toBe(200);
  });

  test('Each product should have required attributes', () => {
    products.forEach(product => {
      const defects: string[] = [];

      // Check title
      if (!product.title || product.title.trim() === '') {
        defects.push('Empty or missing title');
      }

      // Check price
      if (typeof product.price !== 'number' || product.price < 0) {
        defects.push('Invalid or negative price');
      }

      // Check rating
      if (!product.rating || 
          typeof product.rating.rate !== 'number' || 
          product.rating.rate > 5) {
        defects.push('Invalid rating (missing or exceeds 5)');
      }

      // If defects found, add to defective products list
      if (defects.length > 0) {
        defectiveProducts.push({
          id: product.id,
          title: product.title || 'Unknown Product',
          defects
        });
      }

      // Jest assertions
      expect(product.title).toBeTruthy();
      expect(product.price).toBeGreaterThanOrEqual(0);
      if (product.rating) {
        expect(product.rating.rate).toBeLessThanOrEqual(5);
      }
    });
  });

  afterAll(() => {
    // Print defective products report
    if (defectiveProducts.length > 0) {
      console.log('\nDefective Products Report:');
      console.log('========================');
      defectiveProducts.forEach(product => {
        console.log(`\nProduct ID: ${product.id}`);
        console.log(`Title: ${product.title}`);
        console.log('Defects:');
        product.defects.forEach(defect => {
          console.log(`- ${defect}`);
        });
      });
    } else {
      console.log('\nNo defective products found.');
    }
  });
}); 