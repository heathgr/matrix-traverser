./scripts/build.sh &&
gsutil cp -a public-read ./dist/* gs://matrix-traversal;
exit 0;
