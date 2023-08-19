import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css']
})
export class ObserverComponent implements OnInit {
  
  isLoadingWood: boolean = true;
  isLoadingCategory: boolean = true;
  isLoadingOwner: boolean = true;
  chart: any = [];
  result: any;
  hardWood: number = 0;
  softWood: number = 0;
  categoryBig: number = 0;
  categoryMiddle: number = 0;
  categorySmall: number = 0;
  categoryForFire: number = 0;
  categoryWoodTrash: number = 0;
  categoryOther: number = 0;
  ownerState: number = 0;
  ownerMunicipality: number = 0;
  ownerCompany: number = 0;
  ownerPerson: number = 0;
  ownerOther: number = 0;

  constructor(private apiService: ApiService) { }
  
  ngOnInit() {

    Chart.defaults.color = '#000';
    Chart.defaults.font.family = 'Helvetica';

    this.apiService.getStoredTickets().subscribe(data => 
      {
        this.result = Object.values(data);
        this.result.map(ticket => ticket.records)
        .reduce((acc, records) => { return [...acc, ...records]}, [])
        .forEach(record => {
          if(record.wood_specie_type === "Иглолистна"){
            this.softWood += Number(record.cubage);
          }
          else if(record.wood_specie_type === "Широколистна"){
            this.hardWood += Number(record.cubage);
          }
        })

        this.chart = new Chart('typeWood', {
          type: 'bar',
          data: {
            labels: ['Иглолистна дървесина', 'Широколистна дървесина'],
            datasets: [
              {
                label: '',
                data: [this.softWood, this.hardWood],
                borderWidth: 1,
              },
            ],
          },
          options: {
            resizeDelay: 4000,
            plugins:{ 
              legend: { 
                display: false,
               },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        this.isLoadingWood = false;
    });

    this.apiService.getStoredTickets().subscribe(data => 
  {
    this.result = Object.values(data);
    this.result.map(ticket => ticket.records)
    .reduce((acc, records) => { return [...acc, ...records]}, [])
    .forEach(record => {
      if(record.category === "Едра"){
        this.categoryBig += Number(record.cubage);
      }
      else if(record.category === "Средна"){
        this.categoryMiddle += Number(record.cubage);
      }
      else if(record.category === "Дребна"){
        this.categorySmall += Number(record.cubage);
      }
      else if(record.category === "Дърва"){
        this.categoryForFire += Number(record.cubage);
      }
      else if(record.category === "Вършина"){
        this.categoryWoodTrash += Number(record.cubage);
      }
      else{
        this.categoryOther += Number(record.cubage);
      }
    })

    
    this.chart = new Chart('categoryWood', {
      type: 'bar',
      data: {
        labels: ['Едра', 'Средна', 'Дребна', 'Дърва', 'Вършина', 'Друга'],
        datasets: [
          {
            label: '',
            data: [this.categoryBig, this.categoryMiddle, this.categorySmall, this.categoryForFire, this.categoryWoodTrash, this.categoryOther],
            borderWidth: 1,
          },
        ],
      },
      options: {
        resizeDelay: 4000,
        plugins:{ 
          legend: { 
            display: false,
            },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.isLoadingCategory = false;
    });

    this.apiService.getStoredTickets().subscribe(data => 
      {
        this.result = Object.values(data);
        this.result.map(ticket => [ticket.harvested_from, ticket.cubage])
        .reduce((acc, records) => { return [...acc, records]}, [])
        .forEach(record => {
          if(record[0] === "Държавни горски територии"){
            this.ownerState += Number(record[1]);
          }
          else if(record[0] === "Общински горски територии"){
            this.ownerMunicipality += Number(record[1]);
          }
          else if(record[0] === "Гори на юридически лица"){
            this.ownerCompany += Number(record[1]);
          }
          else if(record[0] === "Гори на физически лица"){
            this.ownerPerson += Number(record[1]);
          }
          else{
            this.ownerOther += Number(record[1]);
          }
        })
        
        this.chart = new Chart('owner', {
          type: 'bar',
          data: {
            labels: ['Държавни горски територии', 'Общински горски територии', 'Гори на юридически лица', 'Гори на физически лица', 'Други'],
            datasets: [
              {
                label: '',
                data: [this.ownerState, this.ownerMunicipality, this.ownerCompany, this.ownerPerson, this.ownerOther],
                borderWidth: 1,
              },
            ],
          },
          options: {
            resizeDelay: 4000,
            plugins:{ 
              legend: { 
                display: false,
                },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        this.isLoadingOwner = false;
        });

 
  }

}
