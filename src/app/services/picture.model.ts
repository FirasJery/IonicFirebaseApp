
import { Timestamp } from "@angular/fire/firestore";

export interface Picture
{
  counterId : string ;
  imageUrl : string ;
  date : Timestamp;
}
