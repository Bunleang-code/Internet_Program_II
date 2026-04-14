import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { retry } from 'rxjs';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsService } from 'src/products/products.service';
import { CategoryResolver } from './category.resolver';


@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Query('products')
  async products() {
    return await this.productService.findAll();
  }

  @Query('product')
  async product(@Args('id') id: string) {
    // GraphQL ID comes as string; convert if needed
    return await this.productService.findOne(Number(id));
  }

  @Mutation('createProduct')
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
  ) {
    return await this.productService.create({
      name,
      price,
      categoryId: Number(categoryId),
    });
  }

  // ✅ relation: Product.category
  @ResolveField('category')
  async category(@Parent() product: any) {
    return await this.categoryService.findOne(product.categoryId);
  }
}
