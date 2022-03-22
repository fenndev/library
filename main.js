function Book(title, author, pageNum, hasRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.hasRead = hasRead;
    this.info = function() {
        if(hasRead)
            return;
        else
            return;
    }
}