
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SeriesList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance.collection('series').snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(child: Text('حدث خطأ ما!'));
        }
        final series = snapshot.data!.docs;
        return GridView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 0.7,
          ),
          itemCount: series.length,
          itemBuilder: (context, index) {
            final serie = series[index].data() as Map<String, dynamic>;
            return Card(
              child: Column(
                children: [
                  Image.network(serie['poster_url']),
                  Text(serie['title']),
                ],
              ),
            );
          },
        );
      },
    );
  }
}

