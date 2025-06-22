

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TranslateService from '../service/translate-service';

import YANDEX_LANGUAGES from '../constants/languages';

const initialState = {
    translate_message: '',
    translate_pending: false,
    is_translate_error: false,
    translate_success: false,
    translate_result: {},
}

export const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {
        setTranslateMessage: (state, action) => {
            state.translate_message = action.payload;
        },
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
    },
    extraReducers: (builder) => {

        // TranslateService translate
        builder.addCase(TranslateService.translate.pending, (state, action) => {
            state.translate_pending = true;
        })
        builder.addCase(TranslateService.translate.fulfilled, (state, action) => {
            console.log('fulfilled is work')
            state.translate_success = true;
            state.translate_pending = false;
            state.translate_message = action.payload;
            state.translate_result = action.payload.payload;
            YANDEX_LANGUAGES.forEach((lang) => {
                if (lang.code === state.translate_result.detected_lang) {
                    state.translate_result.detected_lang_name = lang.name;
                }
            });
        });
        builder.addCase(TranslateService.translate.rejected, (state, action) => {
            state.translate_pending = false;
            state.is_translate_error = true;
            state.translate_message = action.payload?.payload?.detail;
        });

    },
});

export const { setTranslateMessage, setTranslatePending, setIsTranslateErrorTrue, setIsTranslateErrorFalse, setIsTranslateSuccessFalse } = translateSlice.actions;

export default translateSlice.reducer;