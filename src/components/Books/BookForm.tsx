import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, {Component} from "react";
import { ITextField } from "../Form/IFormTextField";
import { colors } from "../../default_color";
import { IBookFormProps, IBookFormStates } from "./IBookForm";
import * as locales from '@material-ui/core/locale';
import { genres } from "../../genres";
import IGenre from "../../data_interface/IGenre";

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";
import IBook from "../../data_interface/IBook";
import BookHelpers from "../../helpers/BookHelpers";

let textFields: ITextField[];
let jsxTextFields:JSX.Element[];
let deleteButton: JSX.Element = <></>;
let cancelButton:JSX.Element = <></>;
let jsxLanguageField: JSX.Element = <></>;

class BookForm extends Component<IBookFormProps, IBookFormStates> {
    constructor(props: IBookFormProps) {
        super(props);

        this.state = { titleBook:"", firstChapter: "", imageBook: "", language: "", links: {}, summaryBook:"", genres: [], openDialog:false };

        if(this.props.book)
            this.setState({ 
                titleBook: this.props.book.titleBook, 
                firstChapter: this.props.book.firstChapter, 
                imageBook: this.props.book.imageBook, 
                language: this.props.book.language, 
                links: this.props.book.links, 
                summaryBook:this.props.book.titleBook, 
                genres: [],
                openDialog:false,
            })

        this.changeTitleHandler.bind(this);
        this.changeImageBookHandler.bind(this);
        this.changeSummaryHandler.bind(this);
        this.changeLanguageHandler.bind(this);
        this.changeFirstChapterHandler.bind(this);
        this.changeLanguageHandler.bind(this);
        this.handleOpen.bind(this);
        this.handleClose.bind(this);
        this.deleteBook.bind(this);
        this.submit.bind(this);
    }

    componentDidMount = () => {
        
        if(this.props.book)
            this.setState({ 
                titleBook: this.props.book.titleBook, 
                firstChapter: this.props.book.firstChapter, 
                imageBook: this.props.book.imageBook, 
                language: this.props.book.language, 
                links: this.props.book.links, 
                summaryBook:this.props.book.titleBook, 
                genres: [],
                openDialog:false,
            })
        
        
    }

    initFields(){
        if(this.props.book){
            textFields=[
                {name: "title", label:"Titre", onChange:this.changeTitleHandler, default:this.props.book.titleBook},
                {name: "imageLink", label:"Lien de l'image de couverture", onChange:this.changeTitleHandler, default:this.props.book.imageBook},
                {name: "summaryBook", label: "Résumé", onChange:this.changeSummaryHandler, multiline: true, row: 5, default:this.props.book.summaryBook},
                {name: "firstChapter", label: "Premier Chapitre", onChange:this.changeSummaryHandler, multiline: true, row: 20, default:this.props.book.firstChapter},
            ];

            
        }else{
            textFields=[
                {name: "title", label:"Titre", onChange:this.changeTitleHandler},
                {name: "imageLink", label:"Lien de l'image de couverture", onChange:this.changeTitleHandler},
                {name: "summaryBook", label: "Résumé", onChange:this.changeSummaryHandler, multiline: true, row: 5},
                {name: "firstChapter", label: "Premier Chapitre", onChange:this.changeSummaryHandler, multiline: true, row: 20,},
            ];
        }

        jsxTextFields = textFields.map(field =>
            <Grid item xs={12}>
                <TextField
                    onChange={field.onChange}
                    autoComplete={(field.autocomplete !== undefined) ? field.autocomplete : ""}
                    name={field.name}
                    variant="outlined"
                    required
                    fullWidth
                    id={field.name}
                    label={field.label}
                    defaultValue={(field.default !== undefined) ? field.default : ""}
                    multiline={(field.multiline !== undefined) ? field.multiline : false}
                    rows={field.row}                  
                />
            </Grid>
        )
    }

    initButtons = () =>{
        deleteButton = (this.props.edit) ? (
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="medium"
                        startIcon={<DeleteIcon />}
                        onClick={this.handleOpen}
                    >
                        Supprimer le livre
                    </Button>
                    
                </div>
            ) : <></>;
    }

    changeGenreHandler = (event: any, newValues: IGenre[]) => {       
        this.setState({genres: newValues})
    }

    changeTitleHandler = (event: any) => {       
        this.setState({titleBook: event.target.value})
    }

    changeImageBookHandler = (event: any) => {       
        this.setState({imageBook: event.target.value})
    }

    changeSummaryHandler = (event: any) => {       
        this.setState({summaryBook: event.target.value})
    }

    changeFirstChapterHandler = (event: any) => {
        this.setState({firstChapter: event.target.value})
    }

    changeLanguageHandler = (event:any) => {
        this.setState({language: event.target.value})
    }

    handleOpen = () => {
        this.setState({openDialog:true})
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }

    deleteBook = () => {
        if(this.props.book && this.props.book.idBook){
            BookHelpers.deleteBook(this.props.book.idBook).then(res =>{
                if(res.data.deleted)
                    console.log("Suppression réussite")
                else{
                    console.error("Echecs de la suppression")
                }
                    
            }).catch(error => {
                console.error("Echecs de la suppression")
            });
        }

        this.setState({openDialog:false})
    }

    submit = (e:any) => {
        e.preventDefault();
        const book:IBook = {
            titleBook: this.state.titleBook,
            imageBook: this.state.imageBook,
            language: this.state.language,
            links: this.state.links,
            summaryBook: this.state.summaryBook,
            firstChapter: this.state.firstChapter,
        }

        this.props.onSubmitHandler(book);
    }

    render() {

        this.initFields()
        this.initButtons()
        return (
            <div>
                <Grid container spacing={2}  alignItems="center">
                    {jsxTextFields}
                
                    <Grid item xs={12}>
                        <Autocomplete
                            id="language"
                            options={Object.keys(locales)}
                            getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                            style={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Langue" variant="outlined" />}
                            onChange={this.changeLanguageHandler}
                            defaultValue={(this.props.book)? this.props.book.language : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            aria-required
                            multiple
                            id="tags-outlined"
                            options={genres}
                            getOptionLabel={(option) => option.nameGenre}
                            filterSelectedOptions
                            onChange={this.changeGenreHandler}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Genres"
                                    placeholder="Book genres"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid style={{marginTop:"20px"}} container justify="space-around"  alignItems="center" spacing={0}>
                    <Grid style={{marginTop:"20px"}} container direction="row" justify="space-around" spacing={0}>
                        <Button
                            style={{color:"white"}}
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                            onClick={this.submit}
                            type="submit"
                        >
                            Sauvegarder
                        </Button>
                        {(this.props.edit) ? deleteButton : <></>}
                        
                        <Link to="/profile" style={{textDecoration:"none"}}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="medium"
                                startIcon={<PersonIcon />}
                            >
                                Revenir au profil
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                {(this.props.edit) ? (
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Etes-vous sûr de vouloir supprimer le livre"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Il ne sera plus possible de récupérer les données du livre une fois qu'il est supprimé
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.deleteBook} color="primary" autoFocus>
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>
                ) : <></>}
                
               
            </div>
        );
    }
}

export default BookForm;