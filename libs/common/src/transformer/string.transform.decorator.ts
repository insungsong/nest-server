import { applyDecorators } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';

export const StringTransform = () => {
  return applyDecorators(
    Transform((params: TransformFnParams) =>
      typeof params.value === 'string' ? params.value.trim() : params.value,
    ),
  );
};
