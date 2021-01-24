import { Controller, Post, HttpCode, Body, Param, Get, Query } from "@nestjs/common";
import { VideoService } from "src/services/video.service";

@Controller('videos')
export class VideoController {

    constructor(
        private readonly videoService: VideoService
    ) {}

    @Get()
    @HttpCode(200)
    async listVideos(@Query('idUsuario') idUsuario) {
        return await this.videoService.getVideos(idUsuario); 
    }
}