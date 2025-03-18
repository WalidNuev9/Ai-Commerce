import * as tf from '@tensorflow/tfjs';
import { Product } from '../store/cartStore';

export class RecommendationService {
  private model: tf.LayersModel | null = null;
  private productEmbeddings: { [key: string]: number[] } = {};

  async initialize(products: Product[]) {
    // Create simple embeddings for products based on their features
    products.forEach((product) => {
      this.productEmbeddings[product.id] = this.createProductEmbedding(product);
    });

    // Create a simple recommendation model
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 32, activation: 'relu', inputShape: [10] }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 8, activation: 'softmax' })
      ]
    });

    await this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  private createProductEmbedding(product: Product): number[] {
    // Create a simple embedding based on product features
    // This is a simplified version - in production, you'd want more sophisticated embeddings
    const priceNormalized = product.price / 1000; // Normalize price
    const nameLength = product.name.length / 50; // Normalize name length
    
    // Create a 10-dimensional embedding
    return [
      priceNormalized,
      nameLength,
      Math.random(), // Additional features would be based on real product attributes
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ];
  }

  async getRecommendations(product: Product, limit: number = 4): Promise<string[]> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }

    const productEmbedding = this.createProductEmbedding(product);
    const inputTensor = tf.tensor2d([productEmbedding]);
    
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const scores = await prediction.data();

    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();

    // Get product IDs sorted by similarity scores
    const productIds = Object.keys(this.productEmbeddings);
    const recommendations = productIds
      .filter(id => id !== product.id)
      .sort((a, b) => {
        const scoreA = scores[productIds.indexOf(a)];
        const scoreB = scores[productIds.indexOf(b)];
        return scoreB - scoreA;
      })
      .slice(0, limit);

    return recommendations;
  }
}

export const recommendationService = new RecommendationService();