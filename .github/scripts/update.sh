# This script fetches a single md file to use as documenation from another repository.
# Author: Cristian Jara-Figueroa, Phd Student MIT Media Lab
# Last updated: September 18, 2020
# 
# The script takes in four positional arguments, the last two being optional
# Run as: update.sh REPO_NAME_OWNER REPO_NAME (DESTINATION_PATH) (SOURCE_FILE_PATH)
#   * REPO_NAME_OWNER: Organization or user where the repo lives (e.g. CityScope)
#   * REPO_NAME: Name of repo (e.g. CS_Brix)
#   * DESTINATION_PATH: Path in local repo where to store the md file (it defaults to docsite/docs/general)
#   * SOURCE_FILE_PATH: Path to fetch, including name of file, from remote repo (it defaults to master/README.md)

REPO_NAME_OWNER=${1}
REPO_NAME=${2}
REPO_LABEL=${REPO_NAME#"CS_"}
DESTINATION_PATH=${3:-docsite/docs/general}/${REPO_LABEL}
SOURCE_FILE_PATH=${4:-master/README.md}
echo "Copying docs from: ${REPO_NAME}/${SOURCE_FILE_PATH}"
echo "Copying docs into: ${DESTINATION_PATH}/${REPO_NAME}.md"
echo "Downloading file at https://raw.githubusercontent.com/${REPO_NAME_OWNER}/${REPO_NAME}/${SOURCE_FILE_PATH}"
mkdir -p ${DESTINATION_PATH}/
curl -o ${DESTINATION_PATH}/${REPO_NAME}_raw.md https://raw.githubusercontent.com/${REPO_NAME_OWNER}/${REPO_NAME}/${SOURCE_FILE_PATH}
head ${DESTINATION_PATH}/${REPO_NAME}_raw.md
touch ${DESTINATION_PATH}/${REPO_NAME}_id.md
echo "---" >> ${DESTINATION_PATH}/${REPO_NAME}_id.md
echo "id: ${REPO_LABEL}" >> ${DESTINATION_PATH}/${REPO_NAME}_id.md
echo "---" >> ${DESTINATION_PATH}/${REPO_NAME}_id.md
head ${DESTINATION_PATH}/${REPO_NAME}_id.md
cat ${DESTINATION_PATH}/${REPO_NAME}_id.md ${DESTINATION_PATH}/${REPO_NAME}_raw.md > ${DESTINATION_PATH}/${REPO_NAME}.md
head ${DESTINATION_PATH}/${REPO_NAME}.md
ls -la ${DESTINATION_PATH}/
rm ${DESTINATION_PATH}/${REPO_NAME}_id.md
rm ${DESTINATION_PATH}/${REPO_NAME}_raw.md
