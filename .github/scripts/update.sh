# This script fetches a single md file to use as documenation from another repository.
# Author: Cristian Jara-Figueroa, Phd Student MIT Media Lab
# Last updated: September 21, 2020
# 
# The script takes in up to five keyword arguments, with -o and -r being the only necessary ones
# Run as: update.sh -o REPO_NAME_OWNER -r REPO_NAME (-d DESTINATION_PATH) (-s SOURCE_FILE_PATH) (-l REPO_LABEL)
#   * REPO_NAME_OWNER: Organization or user where the repo lives (e.g. CityScope)
#   * REPO_NAME: Name of repo (e.g. CS_Brix)
#   * DESTINATION_PATH: Path in local repo where to store the md file (it defaults to docsite/docs/modules)
#   * SOURCE_FILE_PATH: Path to fetch from remote repo, including name of file (it defaults to master/README.md). This can also be a list of files, which will be joined into a single file.
#   * REPO_LABEL: (OPTIONAL) Name of repo in docs. (Defaults to removing CS_ from repo name)

while getopts ":o:r:d:s:l:" opt; do
  case $opt in
    o) REPO_NAME_OWNER="$OPTARG"
    ;;
    r) REPO_NAME="$OPTARG"
    ;;
    d) DESTINATION_PATH="$OPTARG"
    ;;
    s) SOURCE_FILE_PATH="$OPTARG"
    ;;
    l) REPO_LABEL="$OPTARG"
    ;; 
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

REPO_LABEL=${REPO_LABEL:-${REPO_NAME#"CS_"}}
DESTINATION_PATH=${DESTINATION_PATH:-docsite/docs/general}
if [[ "${REPO_NAME_OWNER#"wiki/"}" != "$REPO_NAME_OWNER" ]]; then
SOURCE_FILE_PATH=${SOURCE_FILE_PATH:-Home.md}
else
SOURCE_FILE_PATH=${SOURCE_FILE_PATH:-master/README.md}
fi

echo REPO_NAME_OWNER: ${REPO_NAME_OWNER}
echo REPO_NAME: ${REPO_NAME}
echo REPO_LABEL: ${REPO_LABEL}
echo SOURCE_FILE_PATH: ${SOURCE_FILE_PATH}
echo DESTINATION_PATH: ${DESTINATION_PATH}

for SFP in $SOURCE_FILE_PATH
do
echo "Copying docs from: ${REPO_NAME}/${SFP}"
done
echo "Copying docs into: ${DESTINATION_PATH}/${REPO_LABEL}.md"
mkdir -p ${DESTINATION_PATH}/
for SFP in $SOURCE_FILE_PATH
do
echo "Downloading file at https://raw.githubusercontent.com/${REPO_NAME_OWNER}/${REPO_NAME}/${SFP}"
curl -o ${DESTINATION_PATH}/${SFP////_}_raw.md https://raw.githubusercontent.com/${REPO_NAME_OWNER}/${REPO_NAME}/${SFP}
done

touch ${DESTINATION_PATH}/${REPO_LABEL}_id.md
echo "---" >> ${DESTINATION_PATH}/${REPO_LABEL}_id.md
echo "id: ${REPO_LABEL}" >> ${DESTINATION_PATH}/${REPO_LABEL}_id.md
echo "---" >> ${DESTINATION_PATH}/${REPO_LABEL}_id.md

rm -f ${DESTINATION_PATH}/${REPO_LABEL}.md
touch ${DESTINATION_PATH}/${REPO_LABEL}.md

cat ${DESTINATION_PATH}/${REPO_LABEL}_id.md >> ${DESTINATION_PATH}/${REPO_LABEL}.md
rm ${DESTINATION_PATH}/${REPO_LABEL}_id.md
for SFP in $SOURCE_FILE_PATH
do
cat ${DESTINATION_PATH}/${SFP////_}_raw.md >> ${DESTINATION_PATH}/${REPO_LABEL}.md
echo "" >> ${DESTINATION_PATH}/${REPO_LABEL}.md
rm ${DESTINATION_PATH}/${SFP////_}_raw.md
done
