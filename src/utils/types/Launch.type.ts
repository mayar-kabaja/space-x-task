export type Launch = {
  [key: string]: any;
  links: {
    mission_patch_small: string;
    reddit_media: string;
    wikipedia: string;
    video_link: string;
  };
  launch_site: {
    site_name: string;
  };
  rocket: {
    rocket_name: string;
    first_stage : {
      cores : [
        {
          reused : boolean,
          land_success: boolean,
        }
      ]
    }
    second_stage: {
      payloads: [
        {
          nationality: string;
        }
      ];
    };
    fairings :{
      reused : boolean,
    }
  };
  launch_date_utc: string;
  mission_name: string;
  upcoming: boolean;
  launch_year: string;
  launch_success: boolean;
  flight_number: number;
};
