import authConfig from '@config/auth';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUserDTO;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const passwordMatched = await this.hashProvider.comapreHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const userFormatted: IUserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      user: userFormatted,
      token,
    };
  }
}
