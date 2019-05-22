package com.example.newme;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class RecyclerAdapter extends RecyclerView.Adapter<RecyclerAdapter.RecyclerHolder> {

    String businesses[], vouchers[];
    Context ctx;

    RecyclerAdapter() {
        //necessary default constructor for AnroidManifest.xml
    }

    RecyclerAdapter(Context ct, String s1[], String s2[]) {
        ctx = ct;
        businesses = s1; //array holding business names
        vouchers = s2; //array holding voucher total
    }

    @Override
    public RecyclerHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater myInflater = LayoutInflater.from(ctx);
        View myOwnView = myInflater.inflate(R.layout.my_row, parent, false);
        return new RecyclerHolder(myOwnView);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerHolder recyclerHolder, int i) {
        //set text of this row to business' string
        recyclerHolder.t1.setText(businesses[i]);
        //set text of this row to voucher total
        recyclerHolder.t2.setText(vouchers[i]);
    }

    @Override
    public int getItemCount() {
        return businesses.length;
    }

    public class RecyclerHolder extends RecyclerView.ViewHolder {
        TextView t1, t2;
        public RecyclerHolder(@NonNull View itemView) {
            super(itemView);
            //find the corresponding XML tags
            t1 = (TextView) itemView.findViewById(R.id.text1);
            t2 = (TextView) itemView.findViewById(R.id.text2);
        }
    }
}