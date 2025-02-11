import { gradiusUaeCase } from '$/useCase/gradiusUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body, user }) => ({
    status: 201,
    body: await gradiusUaeCase.input(body, user.id),
  }), //user入力を投げつける
}));
