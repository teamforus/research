package com.example.newme;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

public class VoucherActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_voucher_list);

        RecyclerView voucherRecycler = (RecyclerView) findViewById(R.id.voucherRecycler);
        String[] s1 = getResources().getStringArray(R.array.person);
        String[] s2 = getResources().getStringArray(R.array.description);
        RecyclerAdapter recyclerAdapter =  new RecyclerAdapter(this, s1, s2);

        voucherRecycler.setAdapter(recyclerAdapter);
        voucherRecycler.setLayoutManager(new LinearLayoutManager(this));
    }
}
