import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const collections = sqliteTable('collections', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug').notNull(),
  imageUrl: text('image_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  deletedAt: text('deleted_at'),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  tagline: text('tagline'),
  description: text('description'),
  price: integer('price').notNull(),
  discount: integer('discount').default(0),
  imageUrl: text('image_url').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  deletedAt: text('deleted_at'),
});

export const productImages = sqliteTable('product_images', {
  id: text('id').primaryKey(),
  productId: text('product_id')
    .notNull()
    .references(() => products.id),
  url: text('url').notNull(),
});

export const productVariants = sqliteTable('product_variants', {
  id: text('id').primaryKey(),
  productId: text('product_id')
    .notNull()
    .references(() => products.id),
  name: text('name').notNull(),
  stock: integer('stock').notNull(),
});

export const variantOptions = sqliteTable('variant_options', {
  id: text('id').primaryKey(),
  variantId: text('variant_id')
    .notNull()
    .references(() => productVariants.id),
  name: text('name').notNull(),
  value: text('value').notNull(),
});

export const productCollections = sqliteTable('product_collections', {
  productId: text('product_id')
    .notNull()
    .references(() => products.id),
  collectionId: text('collection_id')
    .notNull()
    .references(() => collections.id),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerId: text('customer_id').notNull(),
  customerName: text('customer_name'),
  totalPrice: integer('total_price').notNull(),
  shippingPrice: integer('shipping_price').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const orderItems = sqliteTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  productVariantId: text('product_variant_id')
    .notNull()
    .references(() => productVariants.id),
  quantity: integer('quantity').notNull(),
});

export const addresses = sqliteTable('addresses', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  type: text('type').notNull(), // 'shipping' or 'billing'
  line1: text('line1').notNull(),
  line2: text('line2'),
  city: text('city').notNull(),
  province: text('province').notNull(),
  country: text('country').notNull(),
  postal: text('postal').notNull(),
});

// Define relationships
export const productRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
  images: many(productImages),
  collections: many(productCollections),
}));

export const variantRelations = relations(productVariants, ({ many }) => ({
  options: many(variantOptions),
}));

export const orderRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
  addresses: many(addresses),
}));