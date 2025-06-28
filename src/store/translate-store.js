

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TranslateService from '../service/translate-service';

import YANDEX_LANGUAGES from '../constants/languages';

const initialState = {

    supported_languages: [],

    translate_pending: false,
    is_translate_error: false,
    translate_success: false,
    translate_result: {
        translation: '',
        detected_lang: '',
    },


    save_word_pending: false,
    is_save_word_error: false,
    save_word_success: false,


}

export const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {
        setTranslatePending: (state, action) => {
            state.translate_pending = action.payload;
        },
        setIsTranslateErrorTrue: (state) => {
            state.is_translate_error = true;
        },
        setIsTranslateErrorFalse: (state) => {
            state.is_translate_error = false;
        },
        setIsTranslateSuccessFalse: (state) => {
            state.translate_success = false;
        },
        clearTranslation: (state) => {
            state.translate_result.translation = '';
        },

        setIsSaveWordErrorTrue: (state) => {
            state.is_save_word_error = true;
        },
        setIsSaveWordErrorFalse: (state) => {
            state.is_save_word_error = false;
        },
        setIsSaveWordSuccessFalse: (state) => {
            state.save_word_success = false;
        },
        
    },
    extraReducers: (builder) => {

        // TranslateService translate
        builder.addCase(TranslateService.translate.pending, (state, action) => {
            state.translate_pending = true;
        })

        builder.addCase(TranslateService.translate.fulfilled, (state, action) => {
            state.translate_success = true;
            state.translate_pending = false;
            state.translate_result = action.payload.payload;
            console.log(state.translate_result);
            YANDEX_LANGUAGES.forEach((lang) => {
                if (lang.code === state.translate_result.detected_lang) {
                    state.translate_result.detected_lang_name = lang.name;
                }
            });
        });
        builder.addCase(TranslateService.translate.rejected, (state, action) => {
            state.translate_pending = false;
            state.is_translate_error = true;
        });

        // languageService getLanguages
        builder.addCase(TranslateService.getLanguages.fulfilled, (state, action) => {
            state.supported_languages = action.payload.payload;
            console.log(state.supported_languages);
        });

        // saveWordService saveWord
        builder.addCase(TranslateService.saveWord.pending, (state, action) => {
            state.save_word_pending = true;
        })
        builder.addCase(TranslateService.saveWord.fulfilled, (state, action) => {
            state.save_word_success = true;
            state.save_word_pending = false;
        });
        builder.addCase(TranslateService.saveWord.rejected, (state, action) => {
            state.save_word_pending = false;
            state.is_save_word_error = true;
        });

    },
});

export const { setTranslatePending, setIsTranslateErrorTrue, setIsTranslateErrorFalse, setIsTranslateSuccessFalse, clearTranslation,
    setIsSaveWordErrorTrue, setIsSaveWordErrorFalse, setIsSaveWordSuccessFalse
 } = translateSlice.actions;

export default translateSlice.reducer;