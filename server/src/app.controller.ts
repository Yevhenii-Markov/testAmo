import { Controller, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth/auth.service';

interface CreateMatterBody {
  clientId: number;
  createdMatter: string;
  matterData: Array<Object>;
}

@Controller('/api')
export class AppController {
  constructor(private httpService: HttpService, private authService: AuthService) {}

  @Post('/createMatter')
  async setMatter(@Body() body: CreateMatterBody): Promise<Object[]> {
    const { clientId, createdMatter, matterData } = body;

    try {
      const authToken = await this.authService.getToken(clientId);
      return await this.sendMatterData(createdMatter, matterData, authToken, clientId);
    } catch (e) {
      console.error("Error on first attempt:", e);
    }
  }

  private async sendMatterData(
    createdMatter: string,
    matterData: Array<Object>,
    authToken: string,
    clientId: number
  ): Promise<Object[]> {
    try {
      const response = await firstValueFrom(this.httpService.post(
        'https://amocrmgnzstesttask.amocrm.ru/api/v4/' + createdMatter,
        matterData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + authToken,
          },
        }
      ));
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.log("Token expired, refreshing the token...");
        const newAuthToken = await this.authService.getNewToken(clientId);
        return await this.sendMatterData(createdMatter, matterData, newAuthToken, clientId);
      }
      console.error("Error sending matter data:", e);
    }
  }
}
