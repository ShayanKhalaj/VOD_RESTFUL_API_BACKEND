class BoxAddEditModel {
  boxId = "";
  title = "";
  description = "";
  constructor({ boxId = "", title = "", description = "" }) {
    this.boxId=boxId
    this.title=title
    this.description=description
  }
}

export default BoxAddEditModel
