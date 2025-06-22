
import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from '../http';


class TranslateService {

    static translate = createAsyncThunk(
        '/translate',
        async (credentials, thunkAPI) => {
            console.log('translate 2', credentials);
            try {
                const response = await $api.post('/translate', credentials);
                // Return data on success
                return {
                    payload: response.data,
                    status: response.status,
                };
            } catch (error) {
                // Extract error details
                const errorData = error.response?.data || { message: error.message };
                const statusCode = error.response?.status || 500;

                // Pass custom error payload
                return thunkAPI.rejectWithValue({
                    payload: errorData,
                    status: statusCode,
                });
            }
        });

}

export default TranslateService;