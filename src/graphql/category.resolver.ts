import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from 'src/categories/categories.service';

@Resolver('Category') // <-- matches schema type name
export class CategoryResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query('categories') // <-- matches schema query name
  categories() {
    return this.categoryService.findAll(); // you already have (or students implement)
  }

  @Mutation('createCategory')
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}