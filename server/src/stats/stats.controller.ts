import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService) { }

    @Get('/export')
    // @Header('Content-Type', 'text/xlsx')
    async exportExcelData(@Res() res: Response) {
        // -${new Date().getTime()}
        await this.statsService.exportRealEstateStat()

        const file = createReadStream(join(process.cwd(), 'export.xlsx'));

        res.set({
          'Content-Type': 'text/xlsx',
          'Content-Disposition': 'attachment; filename="export.xlsx"',
        });

        file.pipe(res)
        
        return {
            success: true
        }
    }
}
