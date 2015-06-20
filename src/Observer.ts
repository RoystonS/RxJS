import noop from './util/noop';
import Subscription from './Subscription';

export interface IteratorResult<T> {
  done: boolean;
  value?: T;
}

export default class Observer {
  destination:Observer;
  disposed:boolean = false;
  
  static create(_next:(value:any)=>IteratorResult<any>, 
                _throw:((value:any)=>IteratorResult<any>)=null, 
                _return:((value:any)=>IteratorResult<any>)=null,
                _dispose:(()=>void)=null) : Observer {
    var observer = new Observer(null);
    observer._next = _next;
    observer._throw = _throw;
    observer._return = _return;
    observer._dispose = _dispose;
    return observer;
  }
  
  _dispose() {
    this.destination.dispose();
  }
  
  _next(value:any):IteratorResult<any> {
    return this.destination.next(value);
  }

  _throw(error:any):IteratorResult<any> {
    return this.destination.throw(error);
  }

  _return(value:any):IteratorResult<any> {
    return this.destination.return(value);
  }
  
  constructor(destination:Observer) {
    this.destination = destination;
  }
  
  next(value:any):IteratorResult<any> { 
    if (this.disposed) {
        return { done: true };
    }
    var result = this._next(value);
    if (result.done) {
        this.dispose();
    }
    return result;
  }
  
  throw(error:any):IteratorResult<any> {    
    if (this.disposed) {
        return { done: true };
    }
    var result = this._throw(error);    
    this.dispose();
    return { done: true, value: result.value };
  }
  
  return(value:any=undefined):IteratorResult<any> {
    if(this.disposed) {
      return { done: true };
    }
    var result = this._return(value);
    this.dispose();
    return { done: true, value: result.value };
  }
  
  dispose() {
    if(!this.disposed) {
      if(this._dispose) {
        this._dispose();
      }
    }
    this.disposed = true;
  }
}