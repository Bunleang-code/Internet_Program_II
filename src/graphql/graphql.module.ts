import { Module } from '@nestjs/common';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { CategoryResolver } from './resolver/category.resolver';
import { ProductResolver } from './resolver/product.resolver';
import { CategoryCodeFirstResolver } from './resolver/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolver/product.codefirst.resolver';


@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class GraphqlModule {}