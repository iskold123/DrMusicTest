import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IMusic {
    title: string
    artist: string
    duration: number
    yearOfPublication: number
}


let baseUrl: string = "https://musicservice.azurewebsites.net/api/Musics"
//let baseUrl: string = "http://localhost:51068/api/Musics"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        records: [],
        // id: "",
        // music: null,
        // inputData: { title: "", artist: "", duration: "", yearOfPublication: 0 },
        // addMessage: "",
        // idToDelete: "",
        // deleteMessage: "",
        // idToUpdate: null,
        // updateData: { title: "", artist: "", duration: "", yearOfPublication: 0 },
        // updateMessage: ""
    },
    created(): void {
        console.log("created")
        this.getAndShowAllrecords();
    },
    methods: {
        getAndShowAllrecords(): void {
            axios.get<IMusic[]>(baseUrl)
                .then((response: AxiosResponse<IMusic[]>) => {
                    this.records = response.data
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