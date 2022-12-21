import { Component, OnInit } from '@angular/core';
import { modalController } from '@ionic/core';
import { FileProductService } from 'src/app/services/file-product-service/file-product.service';
import * as XLSX from 'xlsx';
import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-file-product-update',
  templateUrl: './file-product-update.component.html',
  styleUrls: ['./file-product-update.component.scss'],
})
export class FileProductUpdateComponent implements OnInit {

  isModalOpen = false;
  convertedJson!: string;
  fileProductNameKeys: Array<string>;

  constructor(private fileProductService: FileProductService, private alertsService: AlertsService) { }

  ngOnInit() {
    this.fileProductService.triggerOpenAchiveModule.subscribe(() => {
      this.setOpen();
    });
  }

  fileUpload(event: any){
    //console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader =new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    fileReader.onload = (event) => {
      //console.log(event);
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(async sheet =>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        //console.log(data);
        this.convertedJson = JSON.stringify(data, undefined, 6);
        //console.log(this.convertedJson);

        //this.fileProductNameKeys = Object.keys(fileProductArray[0]);

      });
      const fileProductArray = JSON.parse(this.convertedJson);

      try {
        const fileProductNameKeys: Array<string> = Object.keys(fileProductArray[0]);
        console.log('Holiss');
        this.fileProductService.triggerFileProductArray.emit(fileProductArray);
      } catch (error) {
        this.alertsService.fileIncorrect();
        this.closse();

      }
      //console.log(workbook);
    };
  }

  setOpen() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
    } else {
      this.isModalOpen = false;
    }
  }

  closse(){
    this.isModalOpen = false;
    this.fileProductService.triggerOpenList.emit();
  }

}
