import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import Quagga from 'quagga';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('audioElement') audioElement!: ElementRef;
  @Output() codigoBarrasDetectadoEvent = new EventEmitter<string>();
  escaneoHabilitado: boolean = true; // Habilita o deshabilita la detección de códigos
  private video!: HTMLVideoElement; // Mover la declaración aquí

  constructor() {}

  ngOnInit(): void {
    this.iniciarCamara();
  }

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement as HTMLVideoElement;
  }

  iniciarCamara(): void {
    if (this.video) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            this.video.srcObject = stream;
            this.video.play();

            Quagga.init(
              {
                inputStream: {
                  name: 'Live',
                  type: 'LiveStream',
                  target: this.video,
                },
                decoder: {
                  readers: ['ean_reader', 'upc_reader'],
                },
              },
              (err: any) => {
                if (err) {
                  console.error('Error al inicializar Quagga:', err);
                  alert('Error al inicializar Quagga. Verifique la configuración de la cámara.');
                  return;
                }

                alert('Quagga se inició correctamente.');

                Quagga.start();

                Quagga.onDetected((result: { codeResult: { code: string } }) => {
                  if (this.escaneoHabilitado) {
                    const codigoBarras = result.codeResult.code;
                    this.codigoBarrasDetectadoEvent.emit(codigoBarras);

                    // Reproduce el sonido cuando se detecta un código de barras
                    const audio = this.audioElement.nativeElement as HTMLAudioElement;
                    audio.play();

                    // Deshabilita la detección de códigos durante 3 segundos
                    this.escaneoHabilitado = false;
                    setTimeout(() => {
                      this.escaneoHabilitado = true;
                    }, 3000);
                  }
                });
              }
            );
          })
          .catch((error) => {
            console.error('Error al acceder a la cámara:', error);
            alert('Error al acceder a la cámara. Verifique los permisos y la conexión de la cámara.');
          });
      } else {
        console.error('El navegador no admite la API de getUserMedia.');
        alert('El navegador no admite la API de getUserMedia.');
      }
    }
  }
}
