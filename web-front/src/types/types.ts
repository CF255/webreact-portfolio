export interface AuthResponse {
    body: {
      user: User;
      accessToken: string;
      refreshToken: string;
      sucess: string;
    };
  }
  export interface AuthResponseError {
    body: {
      error: string;
      miss: string
    };
  }

  export interface User {
    _id: string;
    name: string;
    username: string;
    image: string;
    id: string;
    notes:[Note]
    cardslide:[CardSlide]
  }

  export interface Note {
    _id: string;
    title: string;
    description: string;
    created_at: string,
    updated_at: string,
    user: string
    id: string;
    favorite: boolean;
  }

  export interface CardSlide{
    _id: string;
    id: string;
    cardslide: boolean,
    tictac: boolean,
    apipelis: boolean,
    giffy: boolean,
    messages: boolean
  }

  export interface Chats {
    message: string;
    room: string;
    author: string;
    time: string;
  }
  
  export interface AccessTokenResponse {
    statusCode: number;
    body: {
      accessToken: string;
    };
    error?: string;
  }