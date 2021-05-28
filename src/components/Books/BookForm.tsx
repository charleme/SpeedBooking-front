import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
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

let textFields: ITextField[];
let jsxTextFields:JSX.Element[];
let deleteButton: JSX.Element = <></>;
let cancelButton:JSX.Element = <></>;


class BookForm extends Component<IBookFormProps, IBookFormStates> {
    constructor(props: IBookFormProps) {
        super(props);
        if(!this.props.book)
            this.state = { titleBook:"", firstChapter: "", imageBook: "", language: "", links: {}, summaryBook:"", genres: [], openDialog:false };
        else
            this.state = { titleBook: this.props.book.titleBook, 
                firstChapter: this.props.book.firstChapter, 
                imageBook: this.props.book.imageBook, 
                language: this.props.book.language, 
                links: this.props.book.links, 
                summaryBook:this.props.book.titleBook, 
                genres: [],
                openDialog:false,
            };

        
        this.initFields()
        this.initButtons()

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

    initFields(){
        textFields=[
            {name: "title", label:"Titre", onChange:this.changeTitleHandler, default:this.state.titleBook},
            {name: "imageLink", label:"Lien de l'image de couverture", onChange:this.changeTitleHandler, default:this.state.imageBook},
            {name: "summaryBook", label: "Résumé", onChange:this.changeSummaryHandler, multiline: true, row: 5, default:this.state.summaryBook},
            {name: "firstChapter", label: "Premier Chapitre", onChange:this.changeSummaryHandler, multiline: true, row: 20, default:this.state.firstChapter},
        ];

        jsxTextFields = textFields.map(field =>
            <Grid item xs={12}>
                <TextField
                    onChange={field.onChange}
                    autoComplete={(field.autocomplete != undefined) ? field.autocomplete : ""}
                    name={field.name}
                    variant="outlined"
                    required
                    fullWidth
                    id={field.name}
                    label={field.label}
                    defaultValue={(field.default != undefined) ? field.default : ""}
                    multiline={(field.multiline != undefined) ? field.multiline : false}
                    rows={field.row}                  
                />
            </Grid>
        )
    }

    initButtons = () =>{
        if(this.props.edit)
            deleteButton = (
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
                
            );
        else
            cancelButton = (
                <Link to="/profile" style={{textDecoration:"none"}}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="medium"
                        startIcon={<PersonIcon />}
                    >
                        Retourner au profil
                    </Button>
                </Link>
            );
    }

    initDialog = () => {

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
        this.setState({openDialog:false})
    }

    submit = () => {
        const book:IBook = {
            titleBook: this.state.titleBook,
            imageBook: this.state.titleBook,
            language: this.state.language,
            links: this.state.links,
            summaryBook: this.state.summaryBook,
            firstChapter: this.state.firstChapter,
        }

        this.props.onSubmitHandler(book);
    }

    render() {
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
                            defaultValue={this.state.language}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
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
                        >
                            Sauvegarder
                        </Button>
                        {(this.props.edit) ? deleteButton : cancelButton}
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