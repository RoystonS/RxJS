/**
 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
 * Any manual edits to this file will be lost next time the script is run.
 **/
import {Observable} from '../../Observable';
import {exhaustMap} from '../../operator/exhaustMap';
import {KitchenSinkOperators} from '../../Rx.KitchenSink';

const observableProto = (<KitchenSinkOperators<any>>Observable.prototype);
observableProto.exhaustMap = exhaustMap;

export var _void: void;