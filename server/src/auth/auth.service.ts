import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private authToken: string;

  async getNewToken(clientId: number): Promise<string> {
    try {
      const response = await axios.get('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', {
        headers: {
          "Content-Type": "application/json",
          'X-Client-Id': clientId,
        },
      });

      const { access_token } = response.data;
      this.setAuthToken(access_token);
      return access_token;
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    }
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  getToken(clientId: number): Promise<string> {
    if (this.authToken) {
      return Promise.resolve(this.authToken);
    }
    return this.getNewToken(clientId);
  }
}
