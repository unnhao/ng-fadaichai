import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import io from 'socket.io-client';
import { FbService } from '@/fb.service';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.css']
})
export class VipComponent implements OnInit, OnDestroy {

  constructor(private elementRef: ElementRef, public fbService: FbService) { }

  isLive = false;
  isProduct = false;
  isCountdown = false;
  isBreakdown = false;
  isEffect = false;

  imageObj = null;
  imageLoaded = false;

  countdownLock = false;
  countdownNum = 30;
  productPos = null;
  mediaRecorder = null;
  srcObject = null;
  throttle = false;
  canvasObj = null;
  canvasCTX = null;
  videoObj = null;
  canvasWidth = 0;
  canvasHeight = 0;

  constraints = {
    audio: false,
    video: {
      facingMode: 'user' // // Can be 'user' or 'environment' to access back or front camera (NEAT!)
    }
  };

  ngOnInit() { }

  ngOnDestroy() {
    this.isLive = false;
    this.closeStream();
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  videoToggle() {
    if (this.throttle) {
      return;
    } else {
      this.throttle = true;
      setTimeout(() => {
        this.throttle = false;
      }, 1000);
    }

    this.isLive = !this.isLive;
    if (this.isLive) {
      this.openSteam();
    } else {
      this.closeStream();
    }
  }

  openSteam() {
    this.closeStream();
    navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
      this.srcObject = stream;
      this.openLiveStream();
    }).catch((error) => {
      console.warn(error);
    });
  }

  closeStream() {
    if (this.srcObject) {
      this.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  openLiveStream() {
    this.fbService.grabliveSteam('直播串接!!').then((response: any) => {
      this.openLiveStreamSocket(response.stream_url);
    }).catch((error) => {
      console.log(error);
    });
  }

  openLiveStreamSocket(streamUrl) {
    const url = 'https://fadai-test.herokuapp.com/';
    const socket = io(url, {
      query: { streamUrl }
    });
    const mediaStream = this.canvasObj.captureStream(30); // 30 FPS
    this.mediaRecorder = new (window as any).MediaRecorder(mediaStream, {
      mimeType: 'video/webm;codecs=h264',
      videoBitsPerSecond: 3000000
    });

    this.mediaRecorder.addEventListener('dataavailable', (e) => {
      socket.emit('message', e.data);
    });

    this.mediaRecorder.addEventListener('stop', () => {
      socket.close();
    });

    this.mediaRecorder.start(1000);
  }

  videoInit($event) {
    this.canvasObj = this.elementRef.nativeElement.querySelector('#liveCanvas');
    this.canvasCTX = this.canvasObj.getContext('2d');
    this.videoObj = this.elementRef.nativeElement.querySelector('#liveVideo');
    this.canvasWidth = this.videoObj.videoWidth;
    this.canvasHeight = this.videoObj.videoHeight;
  }

  videoPlay() {
    const loop = () => {
      if (this.isLive) {
        this.canvasDraw();
        setTimeout(() => {
          loop();
        }, 1000 / 30);
      }
    };
    loop();
  }

  canvasDraw() {
    if (!this.canvasCTX) { return; }
    this.canvasCTX.drawImage(this.videoObj, 0, 0);
    if (this.isProduct) {
      this.canvasDrawImage(this.canvasCTX);
    } else {
      this.productPos = this.canvasHeight;
    }
    if (this.isCountdown) {
      this.canvasDrawContdown(this.canvasCTX);
    } else {
      this.countdownNum = 30;
    }
    if (this.isBreakdown) {
      this.canvasDrawBreak(this.canvasCTX);
    }
    if (this.isEffect) { this.canvasEffect(this.canvasCTX); }
  }
  canvasEffect(ctx) {
    const numTileRows = 30;
    const numTileCols = 30;

    const tileWidth = this.canvasWidth / numTileCols;
    const tileHeight = this.canvasHeight / numTileRows;

    const imageData = this.canvasCTX.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    const pixels = imageData.data;
    // 馬賽克主要演算邏輯
    for (let r = 0; r < numTileRows; r++) {
      for (let c = 0; c < numTileCols; c++) {
        const x = (c * tileWidth) + (tileWidth / 2);
        const y = (r * tileHeight) + (tileHeight / 2);
        const pos = (Math.floor(y) * (this.canvasWidth * 4)) + (Math.floor(x) * 4);
        // 取得顏色
        const red = pixels[pos];
        const green = pixels[pos + 1];
        const blue = pixels[pos + 2];
        // 重新填滿色塊
        ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        ctx.fillRect(x - (tileWidth / 2), y - (tileHeight / 2), tileWidth, tileHeight);
      }
    }
  }

  canvasDrawNumber(ctx, num) {
    ctx.save();
    ctx.fillStyle = '#FF6363';
    ctx.font = 'bold ' + this.canvasWidth / 10 + 'pt Arial';
    ctx.fillText(num + 's', this.canvasWidth / 20, this.canvasWidth / 6 );
    ctx.restore();
  }

  canvasDrawContdown(ctx) {
    this.canvasDrawNumber(ctx, this.countdownNum);
    if (this.countdownNum === 0) {
      return;
    }
    if (!this.countdownLock) {
      this.countdownLock = true;
      setTimeout(() => {
        this.countdownLock = false;
        this.countdownNum -= 1;
      }, 1000);
    }
  }

  canvasDrawBreak(ctx) {
    ctx.save();
    ctx.fillStyle = '#FF6363';
    ctx.fillRect(0, this.canvasHeight / 4, this.canvasWidth, this.canvasHeight / 2);
    ctx.restore();
    ctx.save();
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold ' + this.canvasWidth / 10 + 'pt Arial';
    ctx.fillText('休息中', this.canvasWidth / 2 - this.canvasWidth / 5, this.canvasHeight / 2);
    ctx.restore();
  }

  canvasDrawImage(ctx) {
    if (!this.imageLoaded) {
      this.imageObj = new Image();
      this.imageObj.onload = () => { this.imageLoaded = true; }
      this.imageObj.src = '../../../assets/iphone.png';
      this.productPos = this.canvasHeight;
    } else {
      if (this.productPos + (this.imageObj.height / this.imageObj.width) * this.canvasWidth / 3 > this.canvasHeight - 20) {
        this.productPos -= 5;
      } else {
        ctx.save();
        ctx.fillStyle = '#FF6363';
        ctx.fillRect(0, this.canvasHeight - this.canvasHeight / 10, this.canvasWidth / 2, this.canvasHeight / 10);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold ' + this.canvasWidth / 35 + 'pt Arial';
        ctx.fillText('iphone8 NT: 19900', 0 + this.canvasWidth / 35 , this.canvasHeight - this.canvasHeight / 35);
        ctx.restore();
      }
      ctx.drawImage(
        this.imageObj,
        this.canvasWidth / 2 - this.canvasWidth / 6,
        this.productPos,
        this.canvasWidth / 3,
        (this.imageObj.height / this.imageObj.width) * this.canvasWidth / 3);
    }
  }
}
