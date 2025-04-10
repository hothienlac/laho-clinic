import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appEnvironment } from './app.environment';
import { SystemProtectGuard } from './system-protect/system-protect.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Laho Clinic')
        .setDescription('The Laho Clinic API description')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
    app.setGlobalPrefix('api');
    app.useGlobalGuards(new SystemProtectGuard());
    await app.listen(appEnvironment.PORT);
}
void bootstrap();
