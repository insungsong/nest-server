import { applyDecorators } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';

export function BooleanTransform() {
  return applyDecorators(
    Transform((params: TransformFnParams) => {
      switch (typeof params.value) {
        case 'boolean':
          return params.value;
        case 'string':
          if (params.value === 'true') return true;
          if (params.value === 'false') return false;
          return undefined;
        case 'number':
          if (params.value === 1) return true;
          if (params.value === 0) return false;
          return undefined;
        default:
          return undefined;
      }
    }),
  );
}
