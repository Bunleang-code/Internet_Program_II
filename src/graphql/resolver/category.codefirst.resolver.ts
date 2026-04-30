import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type';
import { CategoriesService } from '../../categories/categories.service';

@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query(() => [CategoryType])
  categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryType)
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}