import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type';
import { CategoriesService } from '../../categories/categories.service';
import { ProductType } from '../types/product.type';
import { ProductsService } from 'src/products/products.service';

@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly productService: ProductsService
  ) {}

  @Query(() => [CategoryType])
  categories() {
    return this.categoryService.findAll();
  }

  @Query(() => [ProductType])
    productsByCategory(@Args('categoryId') categoryId: number) {
    return this.productService.findByCategory(categoryId);
}

  @Mutation(() => CategoryType)
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}