import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IBook {
    id: number
    title: string
    author: string
    publisher: string
    price: number
}

let baseUrl: string = "http://anbo-bookstorerest.azurewebsites.net/api/books"


new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        name: "",
        greeting: "",
        books: [],
        id: "",
        book: null,
        inputData: { title: "", author: "", publisher: "", price: 0 },
        addMessage: "",
        idToDelete: "",
        deleteMessage: "",
        idToUpdate: null,
        updateData: { title: "", author: "", publisher: "", price: 0 },
        updateMessage: ""
    },
    created(): void {
        console.log("created")
        this.getAndShowAllBooks();
    },
    methods: {
        getAndShowAllBooks(): void {
            axios.get<IBook[]>(baseUrl)
                .then((response: AxiosResponse<IBook[]>) => {
                    this.books = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        getBookById(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("getBookById: " + uri)
            axios.get<IBook>(uri)
                .then((response: AxiosResponse<IBook>) => {
                    this.book = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        addBook(): void {
            console.log("addBook")
            axios.post<number>(baseUrl, this.inputData)
                .then((response: AxiosResponse<number>) => {
                    this.addMessage = "Book added"
                    this.getAndShowAllBooks()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        deleteBookById(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("deleteBookById " + uri)
            axios.delete<number>(uri)
                .then((response: AxiosResponse<number>) => {
                    console.log("deleteBookById result " + response.data)
                    if (response.data == 1) {
                        this.deleteMessage = "Book deleted"
                        this.getAndShowAllBooks()
                    } else {
                        this.deleteMessage = "No such book"
                    }
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
        updateBook(id: number): void {
            let uri: string = baseUrl + "/" + id
            console.log("update book " + uri)
            axios.put<number>(uri, this.updateData)
                .then((response: AxiosResponse<number>) => {
                    if (response.data == 1) {
                        this.updateMessage = "Book updated"
                        this.getAndShowAllBooks()
                    } else {
                        this.updateMessage = "No such book"
                    }
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        }
    }
})