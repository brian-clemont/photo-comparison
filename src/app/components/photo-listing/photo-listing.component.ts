import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from 'src/app/photo.types';
import { PhotosService } from 'src/app/photos.service';

@Component({
  selector: 'photo-listing',
  templateUrl: './photo-listing.component.html',
  styleUrls: ['./photo-listing.component.scss']
})
export class PhotoListingComponent implements OnInit, OnChanges {

  public photoLists: Photo[] = new Array()
  public photoListsReturned: Photo[] = new Array()

  public compareImageList: Photo[] = new Array()
  public imageMap = new Map()
  constructor(private photoService: PhotosService) { }


  ngOnInit(): void {
    try {
      this.photoService.getPhotos().subscribe((data: Photo[]) => {
        this.photoLists = data
        this.photoListsReturned = this.photoLists.slice(0, 12);

      })

    } catch (error) {
      throw new Error("Error in ngOnInit" + error)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  pageChanged(event) {
    try {
      const startItem = (event.page - 1) * event.itemsPerPage;
      const endItem = event.page * event.itemsPerPage;

      this.photoListsReturned = this.photoLists.slice(startItem, endItem)
    } catch (error) {
      throw new Error("Error in pageChanged" + error)
    }
  }

  compare(photo: Photo, index) {
    try {
      this.compareImageList.push(photo)
      this.imageMap.set(photo.id, { added: true, index: this.compareImageList.length - 1 })
    } catch (error) {
      throw new Error("Error in compare" + error)
    }

  }
  remove(photo: Photo, index) {
    try {
      this.compareImageList.splice(this.imageMap.get(photo.id).index, 1);
      this.imageMap.delete(photo.id)
      this.initImageMap()
    } catch (error) {
      throw new Error("Error in remove" + error)
    }

  }

  initImageMap() {
    try {
      this.compareImageList.map((value, index) => {
        this.imageMap.set(value.id, { added: true, index: index })
      })
    } catch (error) {
      throw new Error("Error in initImageMap" + error)
    }

  }




}
