
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class MovieList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance.collection('movies').snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(child: Text('حدث خطأ ما!'));
        }
        final movies = snapshot.data!.docs;
        return ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: movies.length,
          itemBuilder: (context, index) {
            final movie = movies[index].data() as Map<String, dynamic>;
            return ListTile(
              leading: Image.network(movie['poster_url']),
              title: Text(movie['title']),
              subtitle: Text(movie['description']),
              onTap: () {
                // الانتقال إلى صفحة تفاصيل الفيلم
              },
            );
          },
        );
      },
    );
  }
}
