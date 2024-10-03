class OperationResult {
  operationName = "";
  operationDate = new Date();
  documentId = "";
  success = false;
  message = "";
  status=500
  constructor(operationName = "") {
    this.operationName = operationName;
    this.operationDate = new Date();
  }
  succeeded = (message = "", documentId="",status=200) => {
    this.message = message;
    this.success = true;
    this.status=status
    if(documentId!==undefined || documentId!==null){
        this.documentId=documentId
    }
    return this
  };
  failed = (message = "", documentId='',status=500) => {
    this.message = message;
    this.success = false;
    this.status=status
    if(documentId!==undefined || documentId!==null){
        this.documentId=documentId
    }
    return this
  };
}


export default OperationResult;
