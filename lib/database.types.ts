export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Events: {
        Row: {
          created_at: string;
          Date: string | null;
          Description: string | null;
          EndTime: string | null;
          Frequency: string | null;
          id: number;
          Location: string | null;
          Owner: string | null;
          StartTime: string | null;
          Tags: Json | null;
          Title: string | null;
        };
        Insert: {
          created_at?: string;
          Date?: string | null;
          Description?: string | null;
          EndTime?: string | null;
          Frequency?: string | null;
          id?: number;
          Location?: string | null;
          Owner?: string | null;
          StartTime?: string | null;
          Tags?: Json | null;
          Title?: string | null;
        };
        Update: {
          created_at?: string;
          Date?: string | null;
          Description?: string | null;
          EndTime?: string | null;
          Frequency?: string | null;
          id?: number;
          Location?: string | null;
          Owner?: string | null;
          StartTime?: string | null;
          Tags?: Json | null;
          Title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Events_Owner_fkey';
            columns: ['Owner'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      Profiles: {
        Row: {
          Age: number | null;
          City: string | null;
          first_name: string | null;
          Gender: string | null;
          id: string;
          last_name: string | null;
          Program: string | null;
          University: string | null;
        };
        Insert: {
          Age?: number | null;
          City?: string | null;
          first_name?: string | null;
          Gender?: string | null;
          id: string;
          last_name?: string | null;
          Program?: string | null;
          University?: string | null;
        };
        Update: {
          Age?: number | null;
          City?: string | null;
          first_name?: string | null;
          Gender?: string | null;
          id?: string;
          last_name?: string | null;
          Program?: string | null;
          University?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      Tags: {
        Row: {
          id: number;
          tag: string;
        };
        Insert: {
          id?: number;
          tag?: string;
        };
        Update: {
          id?: number;
          tag?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
