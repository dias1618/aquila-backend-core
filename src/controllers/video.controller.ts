import { Controller, Post, HttpCode, Body, Param, Get } from "@nestjs/common";
import { YoutubeApiService } from "src/services/video-api/youtube-api/youtube-api.service";
import { VideoService } from "src/services/video.service";
import { RepositoryService } from "src/services/repository.service";

@Controller()
export class VideoController {

    constructor(
        private readonly videoService: VideoService
    ) {}

    @Get('videos')
    @HttpCode(200)
    async listVideos() {
        return await this.videoService.getVideos(); 
    }
}