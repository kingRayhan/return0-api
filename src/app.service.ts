import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getHello(): string {
    return `
      <html lang="en">
        <head>
            <title>${this.config.get('APP_NAME')}</title>
        </head>
        <body>
            <div style="padding: 15px;border: 1px solid #333">
                <h1 style="padding: 0;margin-top: 0;">Return0.codes API</h1>
                <a href="${this.config.get(
                  'API_DOC_URL',
                )}">Api Documentation</a>
              </div>
        </body>
      </html>
    `;
  }
}
