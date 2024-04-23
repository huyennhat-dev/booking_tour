import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';


import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

// [
//   {
//       "id_tour": 4,
//       "name_tour": "Hành Trình Khám Phá Đảo Phú Quốc",
//       "id_manager": 4,
//       "id_staff": 5,
//       "departure_day": 123140,
//       "departure": "17/5/2024",
//       "end_tour_day": 123143,
//       "end_tour": "20/5/2024",
//       "destination": "Phú Quốc",
//       "initial_price": 2200000,
//       "promotional_price": 1800000,
//       "promotional": 20,
//       "introduce": "Đảo Phú Quốc, được biết đến với bãi biển xanh ngắt, cát trắng mịn và bờ biển dài không ngớt, là một trong những điểm đến nổi tiếng nhất của Việt Nam. Hành trình này sẽ dẫn bạn khám phá những bãi biển tuyệt vời như Sao, Kem, và Ông Lang, tham quan các điểm",
//       "highlight": "Tận hưởng bình minh trên bãi biển Sao, tham gia các hoạt động thể thao dưới nước như lặn ngắm san hô, thưởng thức món hải sản tươi ngon tại chợ đêm Dinh Cậu, và tham quan Vườn Tiên và Suối Tranh.",
//       "insurance": true,
//       "bus": false,
//       "bicycle": false,
//       "taxi": false,
//       "plane": true,
//       "meal": true,
//       "photos": "https://example.com/du-lich-phu-quoc.jpg",
//       "tour_guide": true,
//       "createdAt": "2024-04-23T14:39:43.000Z",
//       "updatedAt": "2024-04-23T14:39:43.000Z"
//   }
// ]

// photos -> photos
// name_tour -> name_tour
// departure -> departure
// initial_price -> initial_price
// promotional_price -> promotional_price
// destination -> destination

export default function PostCard({ post, index , onClick }) {
  const { photos, name_tour, initial_price, destination, promotional_price, author, departure } = post;

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

  const renderAvatar = (
    <Avatar
      alt=""
      src=""
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        ...((latestPostLarge || latestPost) && {
          zIndex: 9,
          top: 24,
          left: 24,
          width: 40,
          height: 40,
        }),
      }}
    />
  );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subname_tour2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {name_tour}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: destination, icon: 'eva:message-circle-fill' },
        { number: initial_price, icon: 'eva:eye-fill' },
        { number: promotional_price, icon: 'eva:promotional_price-fill' },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            ...((latestPostLarge || latestPost) && {
              opacity: 0.48,
              color: 'common.white',
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{info.number}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={name_tour}
      src={photos}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'photos',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {departure}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box>

        <Box
          onClick={onClick}
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
          {renderDate}

          {renderTitle}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};