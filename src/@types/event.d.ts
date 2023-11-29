export interface EventAxios {
  statusCode : number,
  message : string,
  data : {
    id : number,
    name : string,
    description : string,
    date : string,
    image : string,
    location : string,
    price : number,
    capacity : number,
    createdAt : string,
    updatedAt : string,
  }
}

export interface BootstrapEvent extends Event {
  relatedTarget?: EventTarget;
}

export interface ValueTargetForm {
  value: string;
  name: string;
}
