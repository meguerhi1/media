import 'package:flutter/material.dart';
import 'package:movie_app/services/api_service.dart';

class MovieList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<dynamic>>(
      future: ApiService.getMovies(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(child: Text('حدث خطأ ما!'));
        }
        final movies = snapshot.data!;
        return ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: movies.length,
          itemBuilder: (context, index) {
            final movie = movies[index];
            return Card(
              margin: EdgeInsets.all(8),
              child: ListTile(
                leading: Image.network(movie['poster_url']),
                title: Text(movie['title']),
                subtitle: Text(movie['description']),
                onTap: () {
                  // الانتقال إلى صفحة تفاصيل الفيلم
                },
              ),
            );
          },
        );
      },
    );
  }
}
