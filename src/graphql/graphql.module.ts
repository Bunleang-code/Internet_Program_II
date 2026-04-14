import { Module } from '@nestjs/common';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { CategoryResolver } from './category.resolver';
import { ProductResolver } from './product.resolver';


@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}